import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CaloriesService0 } from '../../services/calories-service0.service';
import { DocumentChangeAction } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import Timestamp = firebase.firestore.Timestamp;

import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface CaloriesData {
  calories: number;
  mealType: string;
  date: string;
}

@Component({
  selector: 'app-calories-table',
  templateUrl: './calories-table.component.html',
  styleUrls: ['./calories-table.component.css'],
})
export class CaloriesTableComponent implements OnInit {
  displayedColumns: string[] = ['MealType', 'dateSelected', 'Calories'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource = new MatTableDataSource<any>();
  // dataSource;
  // rows: DocumentChangeAction<any>[];

  // @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('sortTable') sortTable: MatSort;
  currentSort: Sort;

  constructor(private caloriesService: CaloriesService0) {}

  ngOnInit(): void {
    this.getAllRows();
    this.currentSort = {
      active: '',
      direction: '',
    };
    this.dataSource.paginator = this.paginator;
  }

  // ngAfterViewInit(): void {
  //   console.log(`afterViewInit`);
  // }

  sortByDateSelected(sortInfo): void {
    this.currentSort = sortInfo;
    // console.log(this.currentSort);

    /* sort run in backend */
    if (this.currentSort.direction === 'asc') {
      this.caloriesService.sortByDateSelectedDesc().subscribe((res) => {
        this.dataSource.data = res;
      });
    }

    if (this.currentSort.direction === 'desc') {
      this.caloriesService.sortBydateSelected().subscribe((res) => {
        this.dataSource.data = res;
      });
    }

    // console.log(this.currentSort.direction);
  }

  convertTimestampToDate(timestamp: Timestamp | any): Date | any {
    return timestamp instanceof Timestamp
      ? new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate()
      : timestamp;
  }

  getAllRows(): void {
    this.caloriesService.getAllRows().subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  deleteRow(data): void {
    this.caloriesService.deleteRow(data);
  }

  markCompleted(data): void {
    this.caloriesService.updateRow(data);
  }
}
