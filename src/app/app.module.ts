import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


/* ngModel require */
import { FormsModule } from '@angular/forms';

/* component for coffee order */

/* material  */
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';


/* cdk */
import { CdkTableModule } from '@angular/cdk/table';



/* angular fire  */
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

/* Helper  */
import { TimestampConverter } from './helper/timestamp-converter';

/* Auth service */
import { AuthService } from './services/auth.service';


/* component for calories*/
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


/* ng-bootstrap: https://ng-bootstrap.github.io/#/home */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CaloriesTableComponent } from './components/calories-table/calories-table.component';
import { CaloriesInputComponent } from './components/calories-input/calories-input.component';
import { VerticalBarChartComponent } from './components/vertical-bar-chart/vertical-bar-chart.component';

/* chart */
import { NgxChartsModule } from '@swimlane/ngx-charts';


/* env */
import { environment } from 'src/environments/environment';
import { SubscribeDialogComponent } from './components/subscribe-dialog/subscribe-dialog.component';
import { SubscribeConfirmDialogComponent } from './components/subscribe-confirm-dialog/subscribe-confirm-dialog.component';
import { DownloadMyRecordsComponent } from './components/download-my-records/download-my-records.component';
import { UnsubscribeComponent } from './components/unsubscribe/unsubscribe.component';
import { UnsubscribeConfirmDialogComponent } from './components/unsubscribe-confirm-dialog/unsubscribe-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    SignUpComponent,
    SignInComponent,
    DashboardComponent,
    CaloriesTableComponent,
    CaloriesInputComponent,
    VerticalBarChartComponent,
    SubscribeDialogComponent,
    SubscribeConfirmDialogComponent,
    DownloadMyRecordsComponent,
    UnsubscribeComponent,
    UnsubscribeConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,

    /* material */
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    CdkTableModule,
    MatSortModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,

    /* firebase */
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule,
    AngularFireFunctionsModule,
    FormsModule,

    NgxChartsModule,

    NgbModule,
  ],
  providers: [AuthService, TimestampConverter],
  bootstrap: [AppComponent],
})
export class AppModule {}
