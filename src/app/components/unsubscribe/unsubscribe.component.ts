import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { UnsubscribeConfirmDialogComponent } from '../unsubscribe-confirm-dialog/unsubscribe-confirm-dialog.component';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css'],
})
export class UnsubscribeComponent implements OnInit {
  constructor(
    private angularFirestore: AngularFirestore,
    public dialog: MatDialog
  ) {}

  openDialog(msgType: string): void {
    this.dialog.open(UnsubscribeConfirmDialogComponent, {
      data: {
        msg: msgType,
      },
    });
  }

  unsubscribeDaily(): void {
    const localUser = JSON.parse(localStorage.getItem('user'));
    console.log(localUser.uid);

    const docToDelete = this.angularFirestore.collection(
      `subscribeUsers`,
      (ref) => ref.where('userUid', '==', localUser.uid)
    );
    console.log(`docToDelete`, docToDelete);

    docToDelete.get().subscribe((querySnapshot) => {
      console.log(`querySnapshot`, querySnapshot.size);
      if (querySnapshot.size === 0) {
        this.openDialog(`alreadyUnsubscribe`);
      } else {
        querySnapshot.forEach((doc) => {
          console.log(`doc`, doc);
          doc.ref.delete();
          this.openDialog(`complete`);
        });
      }
    });
  }

  ngOnInit(): void {}
}
