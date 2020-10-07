import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  msg: string;
}

@Component({
  selector: 'app-subscribe-confirm-dialog',
  templateUrl: './subscribe-confirm-dialog.component.html',
  styleUrls: ['./subscribe-confirm-dialog.component.css']
})
export class SubscribeConfirmDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}
