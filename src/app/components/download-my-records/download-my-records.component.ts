import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { chartData } from '../vertical-bar-chart/FakeData';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CaloriesService0 } from '../../services/calories-service0.service';
import { TimestampConverter } from '../../helper/timestamp-converter';

// import * as firebase from 'firebase/app';
// import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-download-my-records',
  templateUrl: './download-my-records.component.html',
  styleUrls: ['./download-my-records.component.css'],
})
export class DownloadMyRecordsComponent implements OnInit {
  private caloriesCollection: AngularFirestoreCollection<any>;
  docs: Observable<any[]>;
  data;
  dataSource;
  downloadData = [];

  constructor(
    private caloriesService: CaloriesService0,
    private timeConverter: TimestampConverter
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.caloriesService.getALLData().subscribe((res) => {
      this.dataSource = res;
      // console.log(this.dataSource);
      this.dataSource.forEach((element) => {
        // const date = this.convertTimestampToDate(
        //   element.payload.doc.data().dateSelected
        // );

        const docObj = {};
        const caloriesIntake = 'calories';
        const dateSelected = 'date';
        const mealType = 'meal type';

        const date = this.timeConverter.convertTimestampToDate(
          element.payload.doc.data().dateSelected
        );

        docObj[dateSelected] =
          date.getMonth() +
          1 +
          '/' +
          date.getDate() +
          ' ' +
          date.getHours() +
          ':' +
          date.getMinutes();

        docObj[caloriesIntake] = element.payload.doc.data().caloriesIntake;
        docObj[mealType] = element.payload.doc.data().mealType;
        this.downloadData.push(docObj);
      });
      console.log(this.downloadData);
      // this.downloadData = this.mergeDate(tmpArray).reverse();
    });
  }

  async downloadCsv(): Promise<void> {
    const data = this.downloadData;
    const replacer = (_, value) => (value === null ? '' : value);
    const header = Object.keys(data[0]);
    const csv = data.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const downloadFileName = `my_calories_record.csv`;
    saveAs(blob, downloadFileName);
  }
}
