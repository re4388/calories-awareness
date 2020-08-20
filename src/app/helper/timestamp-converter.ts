import * as firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

export class TimestampConverter {
  convertTimestampToDate(timestamp: Timestamp | any): Date | any {
    return timestamp instanceof Timestamp
      ? new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate()
      : timestamp;
  }
}
