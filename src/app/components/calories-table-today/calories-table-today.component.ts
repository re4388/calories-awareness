import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CaloriesService0 } from '../../services/calories-service0.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import Timestamp = firebase.firestore.Timestamp;
import { MatTableDataSource } from '@angular/material/table';

export interface CaloriesData {
  calories: number;
  mealType: string;
  date: string;
}

@Component({
  selector: 'app-calories-table-today',
  templateUrl: './calories-table-today.component.html',
  styleUrls: ['./calories-table-today.component.css'],
})
export class CaloriesTableTodayComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['MealType', 'dateSelected', 'Calories'];
  dataSourceToday = new MatTableDataSource<any>();
  constructor(private caloriesService: CaloriesService0) {}
  totalCalories = 0;

  ngOnInit(): void {
    this.getRows();
  }

  ngAfterViewInit(): void {
    console.log(`afterViewInit`);
  }

  getTotalCalories(): void {
    this.dataSourceToday.data.map((ele) => {
      // console.log('recalculate total');
      // this.totalCalories = 0;
      console.log(ele.payload.doc.data().caloriesIntake);
      this.totalCalories += +ele.payload.doc.data().caloriesIntake;
      // console.log('recalculate total is done');
    });
  }

  convertTimestampToDate(timestamp: Timestamp | any): Date | any {
    return timestamp instanceof Timestamp
      ? new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate()
      : timestamp;
  }

  getRows(): void {
    this.caloriesService.getDataByDays(0).subscribe((res) => {
      console.log(res);
      this.dataSourceToday.data = res;

      this.getTotalCalories();
    });


  }

  deleteRow(data): void {
    this.caloriesService.deleteRow(data);
  }

  markCompleted(data): void {
    this.caloriesService.updateRow(data);
  }
}
