import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of, race } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { tap, distinctUntilChanged, takeLast, filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CaloriesService0 {
  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth
  ) {}

  firebaseCollection = `calories`;
  subscribeUsersCollection = `subscribeUsers`;

  // doc: https://firebase.google.com/docs/firestore/query-data/order-limit-data
  getAllRows() {
    const localUser = JSON.parse(localStorage.getItem('user'));
    // console.log(`localUser.uid`, localUser.uid);
    return this.angularFirestore
      .collection(this.firebaseCollection, (ref) =>
        // userUid in document field need match to localStorage uid
        ref
          .where('userUid', '==', localUser.uid)
          .orderBy('dateSelected', 'desc')
      )
      .snapshotChanges();
  }

  getDataByDays(numberOfDay: number) {
    const localUser = JSON.parse(localStorage.getItem('user'));
    // console.log(`localUser.uid`, localUser.uid);
    // https:stackoverflow.com/questions/53524187/query-firestore-database-on-timestamp-field
    const hrOffset = new Date().getHours() * 60 * 60 * 1000;
    // console.log(new Date().getHours());
    // console.log(Date.now());
    const minOffset = new Date().getMinutes() * 60 * 1000;
    const secOffset = new Date().getSeconds() * 1000;
    const ms = new Date().getMilliseconds();
    const offset = hrOffset + minOffset + secOffset + ms;

    const DaysAgoInMs = Date.now() - numberOfDay * 60 * 60 * 24 * 1000 - offset;
    // console.log(DaysAgoInMs);
    const daysAgoInDate = new Date(DaysAgoInMs);
    // console.log(daysAgoInDate);

    // console.log(DaysAgoInMsDate);
    return this.angularFirestore
      .collection(this.firebaseCollection, (ref) =>
        // userUid in document field need match to localStorage uid
        ref
          .where('userUid', '==', localUser.uid)
          .orderBy('dateSelected', 'desc')
          .where('dateSelected', '>=', daysAgoInDate)
      )
      .snapshotChanges();
      // .pipe(
      //   // tap((e) => console.log(e)),
      //   // https://www.learnrxjs.io/learn-rxjs/operators/filtering/take
      //   // When you are interested in only the first emission,
      //   // you want to use take
      //   take(1)
      // );
  }

  /* get all data for download as csv functionality*/
  getALLData() {
    const localUser = JSON.parse(localStorage.getItem('user'));
    // console.log(`localUser.uid`, localUser.uid);

    // https:stackoverflow.com/questions/53524187/query-firestore-database-on-timestamp-field
    // const days = 20;
    // const twentyDaysAgoInMs = Date.now() - days * 60 * 60 * 24 * 1000;
    // const twentyDaysAgoInMsDate = new Date(twentyDaysAgoInMs);
    return this.angularFirestore
      .collection(this.firebaseCollection, (ref) =>
        // userUid in document field need match to localStorage uid
        ref
          .where('userUid', '==', localUser.uid)
          .orderBy('dateSelected', 'desc')
      )
      .snapshotChanges();
  }

  sortBydateSelected() {
    const localUser = JSON.parse(localStorage.getItem('user'));
    // console.log(`localUser.uid`, localUser.uid);
    return this.angularFirestore
      .collection(this.firebaseCollection, (ref) =>
        // userUid in document field need match to localStorage uid
        ref.where('userUid', '==', localUser.uid).orderBy('dateSelected', 'asc')
      )
      .snapshotChanges();
  }

  sortByDateSelectedDesc() {
    const localUser = JSON.parse(localStorage.getItem('user'));
    console.log(`localUser.uid`, localUser.uid);
    return this.angularFirestore
      .collection(this.firebaseCollection, (ref) =>
        // userUid in document field need match to localStorage uid
        ref
          .where('userUid', '==', localUser.uid)
          .orderBy('dateSelected', 'desc')
      )
      .snapshotChanges();
  }

  deleteRow(data): Promise<void> {
    return this.angularFirestore
      .collection(this.firebaseCollection)
      .doc(data.payload.doc.id)
      .delete();
  }

  updateRow(data): Promise<void> {
    return (
      this.angularFirestore
        .collection(this.firebaseCollection)
        .doc(data.payload.doc.id)
        // use merge: true, to only update the value-key pair passed in
        // rather than replacing the entire document
        .set({ completed: true }, { merge: true })
    );
  }

  async addtoCalories(data) {
    console.log(data);
    // record timestamp
    const { serverTimestamp } = firebase.firestore.FieldValue;
    data.createdAt = serverTimestamp();
    const uid = (await this.angularFireAuth.currentUser).uid;
    console.log(await this.angularFireAuth.currentUser);
    data.userUid = uid;

    console.log(data);
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection(this.firebaseCollection)
        .add(data)
        .then(
          (res) => {},
          (err) => reject(err)
        );
    });
  }

  /*
  for check if this user is subscribed the daily notify
  */
  isUserSubscribed() {
    const localUser = JSON.parse(localStorage.getItem('user'));
    // console.log(`localUser.uid`, localUser.uid);
    return this.angularFirestore
      .collection(this.subscribeUsersCollection, (ref) =>
        ref.where('userUid', '==', localUser.uid)
      )
      .valueChanges()
      .pipe(
        // tap((e) => console.log(e)),
        // https://www.learnrxjs.io/learn-rxjs/operators/filtering/take
        // When you are interested in only the first emission,
        // you want to use take
        take(1)
      );
  }

  /*
  add user to subscribe user collection
  */
  async addtoSubscribeUsers(data) {
    // console.log(data);
    // add timestamp field
    const { serverTimestamp } = firebase.firestore.FieldValue;
    data.createdAt = serverTimestamp();

    // add uid field
    const uid = (await this.angularFireAuth.currentUser).uid;
    // console.log(await this.angularFireAuth.currentUser);
    data.userUid = uid;

    // add mail field
    // const email = (await this.angularFireAuth.currentUser).email;
    // data.email = email;

    // console.log(data);
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection(this.subscribeUsersCollection)
        .add(data)
        .then(
          (res) => resolve(`success`),
          (err) => reject(err)
        );
    });
  }
}
