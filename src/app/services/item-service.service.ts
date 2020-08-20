import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ItemServiceService {
  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth
  ) {}

  thingsRef;
  unsubscribe;
  uid;

  // getCoffeeOrders(): Observable<DocumentChangeAction<any>[]> {
  //   return this.firestore.collection('coffeeOrders').snapshotChanges();
  // }

  // getCoffeeOrders() {
  //   this.fireAuth.onAuthStateChanged((user) => {
  // if (user) {
  //   console.log(user);
  //   this.thingsRef = this.firestore.collection('coffeeOrders');
  //   this.unsubscribe = this.thingsRef
  //     .where('userUid', '==', user.uid)
  //     .orderBy('createdAt')
  //     .onSnapshot(querySnapshot => {
  //       return querySnapshot;
  //     });

  // } else {
  //   this.unsubscribe && this.unsubscribe();
  // }

  // return this.firestore
  //   .collection('coffeeOrders', (ref) =>
  //     ref.where('userUid', '==', user.uid)
  //   )
  //   .snapshotChanges();

  //   if (user) {
  //     console.log(user.uid);
  //     this.uid = user.uid;
  //     console.log(this.uid);
  //   }
  // });

  //   console.log(this.uid);

  //   const localUser = JSON.parse(localStorage.getItem('user'));
  //   console.log(localUser.uid);

  //   return this.firestore
  //     .collection('coffeeOrders', (ref) =>
  //       ref.where('userUid', '==', localUser.uid)
  //     )
  //     .snapshotChanges();
  // }

  getCoffeeOrders() {
    const localUser = JSON.parse(localStorage.getItem('user'));
    console.log(`localUser.uid`, localUser.uid);
    return this.firestore
      .collection('coffeeOrders', (ref) =>
        ref.where('userUid', '==', localUser.uid)
      )
      .snapshotChanges();
  }

  deleteCoffeeOrder(data): Promise<void> {
    return this.firestore
      .collection('coffeeOrders')
      .doc(data.payload.doc.id)
      .delete();
  }

  updateCoffeeOrder(data): Promise<void> {
    return (
      this.firestore
        .collection('coffeeOrders')
        .doc(data.payload.doc.id)
        // use merge: true, to only update the value-key pair passed in
        // rather than replacing the entire document
        .set({ completed: true }, { merge: true })
    );
  }

  async createCoffeeOrder(data) {
    console.log(data);

    // record timestamp
    const { serverTimestamp } = firebase.firestore.FieldValue;
    data.createdAt = serverTimestamp();

    const uid = (await this.fireAuth.currentUser).uid;
    data.userUid = uid;

    console.log(data);
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('coffeeOrders')
        .add(data)
        .then(
          (res) => {},
          (err) => reject(err)
        );
    });
  }
}
