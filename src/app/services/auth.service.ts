import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

/* firebase sdk */
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import * as firebase from 'firebase/app';

/* interface */
import { User } from '../models/user';
import { Alert } from '../models/alert';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    public angularFirestore: AngularFirestore,
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localStorage when
    logged in and setting up null when logged out */
    this.angularFireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }


  infos: Alert[];
  INFOS: Alert[] = [
    {
      type: 'info',
      message: 'Password reset email sent, check your inbox.',
    },
  ];
  alerts: Alert[];
  ALERTS: Alert[] = [
    {
      type: 'danger',
      message: 'Incorrect mail or password.',
    },
  ];

  userData: any;

  close(alert): void {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  passResetInfo(): void {
    this.infos = Array.from(this.INFOS);
  }

  closeInfo(info): void {
    this.infos.splice(this.infos.indexOf(info), 1);
  }

  raiseWarning(msg): void {
    if (msg !== null) {
      this.ALERTS[0].message = msg;
    }
    this.alerts = Array.from(this.ALERTS);
  }

  // Sign in with email/password
  async signIn(email: string, password: string) {
    return await this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(async (result) => {
        this.isLocalstorageVerified();
        await this.isFirebaseVerified();
        await this.updateFirebaseUser(result.user);
        await this.router.navigate(['dashboard']);
        console.log(`success login`);
      })
      .catch((error) => {
        console.log(error);
        this.raiseWarning(error.message);
      });
  }

  // Sign up with email/password
  signUp(email: string, password: string) {
    return this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.updateFirebaseUser(result.user);
        console.log(`sign up and mail sent`);
      })
      .catch((error) => {
        console.log(error);
        this.raiseWarning(error.message);
      });
  }

  /* update user data */
  updateFirebaseUser(user) {
    // get firebase store user reference via user uid
    const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(
      `users/${user.uid}`
    );
    // set firebase data into userData JS in memory object
    const newUserData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    // update in firestore
    return userRef.set(newUserData, {
      merge: true,
    });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log('mailVerified record in local storage', user.emailVerified);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign in with Google
  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  // Sign in with Facebook
  facebookAuth() {
    return this.authLogin(new auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  authLogin(provider) {
    return this.angularFireAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.updateFirebaseUser(result.user);
          this.router.navigate(['dashboard']);
        });
      })
      .catch((error) => {
        this.raiseWarning(error.message);
      });
  }

  // Sign out
  signOut() {
    return this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.angularFireAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.passResetInfo();
        // window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        console.log(error);
        this.raiseWarning(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    return (await this.angularFireAuth.currentUser)
      .sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  /* check if backend update the mail verified field */
  async isFirebaseVerified() {
    await (await this.angularFireAuth.currentUser).reload();
    const isEmailVerified = (await this.angularFireAuth.currentUser).emailVerified;
    if (isEmailVerified) {
      console.log('fireabse Email verified');
    } else {
      console.log(`firebase Email not verified`);
    }
  }

  /* check if local email field verified,
  if not try once to reset localStorage */
  isLocalstorageVerified() {
    const localUser = JSON.parse(localStorage.getItem('user'));
    const isLocalVerified = localUser.emailVerified;
    if (isLocalVerified) {
      console.log('local is verified');
    } else {
      console.log(`local is not verified`);
      localStorage.setItem('user', JSON.stringify(this.userData));
    }
  }
}
