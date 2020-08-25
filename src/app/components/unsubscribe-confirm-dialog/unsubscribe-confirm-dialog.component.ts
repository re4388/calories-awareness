import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


export interface DialogData {
  msg: string;
}

@Component({
  selector: 'app-unsubscribe-confirm-dialog',
  templateUrl: './unsubscribe-confirm-dialog.component.html',
  styleUrls: ['./unsubscribe-confirm-dialog.component.css'],
})
export class UnsubscribeConfirmDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public router: Router,
  ) {}

  backToDashboard(): void{
    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {}
}
