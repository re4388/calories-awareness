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
export class CaloriesTableTodayComponent implements OnInit {
  displayedColumns: string[] = ['Calories', 'MealType', 'dateSelected'];
  dataSourceToday = new MatTableDataSource<any>();
  constructor(private caloriesService: CaloriesService0) {}

  ngOnInit(): void {
    this.getRows();
  }

  convertTimestampToDate(timestamp: Timestamp | any): Date | any {
    return timestamp instanceof Timestamp
      ? new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate()
      : timestamp;
  }

  getRows(): void {
    this.caloriesService.getDataByDays(1).subscribe((res) => {
      console.log(res);
      const currentDate = new Date();
      const date = currentDate.getDate();
      console.log(date);
      this.dataSourceToday.data = res;
    });
  }

  deleteRow(data): void {
    this.caloriesService.deleteRow(data);
  }

  markCompleted(data): void {
    this.caloriesService.updateRow(data);
  }
}
