import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CaloriesService0 } from '../../services/calories-service0.service';
import { MatDialog } from '@angular/material/dialog';
import { SubscribeConfirmDialogComponent } from '../subscribe-confirm-dialog/subscribe-confirm-dialog.component';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-subscribe-dialog',
  templateUrl: './subscribe-dialog.component.html',
  styleUrls: ['./subscribe-dialog.component.css'],
})
export class SubscribeDialogComponent implements OnInit {
  constructor(
    public caloriesService: CaloriesService0,
    public dialog: MatDialog
  ) {}

  mailExistArray: any;
  userDefaultMail = JSON.parse(localStorage.getItem('user')).email;

  emailForm = new FormControl(this.userDefaultMail, [
    Validators.required,
    Validators.email,
  ]);

  getErrorMessage(): string {
    if (this.emailForm.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailForm.hasError('email') ? 'Not a valid email' : '';
  }

  SubscribeDailyReminder(): void {
    const mailKey = 'email';
    const data = { email: this.emailForm.value };

    this.caloriesService.isUserSubscribed().subscribe((res) => {
      console.log(res);
      this.mailExistArray = res.filter(
        (ele) => ele[mailKey] === this.emailForm.value
      );
      console.log(this.mailExistArray.length);

      if (this.mailExistArray.length === 1) {
        console.log(`mail is already registered`);
        this.openDialog(`registered`);
      } else {
        this.caloriesService
          .addtoSubscribeUsers(data)
          .then((response) => console.log(response));
        console.log(`add new user`);
        this.openDialog(`newUser`);
      }
    });
  }

  openDialog(msgType: string): void {
    this.dialog.open(SubscribeConfirmDialogComponent, {
      data: {
        msg: msgType,
      },
    });
  }

  ngOnInit(): void {}
}
