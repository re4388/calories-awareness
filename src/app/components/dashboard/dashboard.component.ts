import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SubscribeDialogComponent } from '../subscribe-dialog/subscribe-dialog.component';
import { DownloadMyRecordsComponent } from '../download-my-records/download-my-records.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(public authService: AuthService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  openSubscriptionDialog(): void {
    this.dialog.open(SubscribeDialogComponent);
  }

  openDownloadDialog(): void {
    this.dialog.open(DownloadMyRecordsComponent);
  }
}


