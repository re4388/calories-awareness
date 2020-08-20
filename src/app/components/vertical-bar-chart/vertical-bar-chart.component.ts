import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CaloriesService0 } from '../../services/calories-service0.service';
import { TimestampConverter } from '../../helper/timestamp-converter';



interface ChartData {
  name: string;
  value: number;
}


@Component({
  selector: 'app-vertical-bar-chart',
  templateUrl: './vertical-bar-chart.component.html',
  styleUrls: ['./vertical-bar-chart.component.css'],
})
export class VerticalBarChartComponent implements OnInit {
  constructor(
    private caloriesService: CaloriesService0,
    private timeConverter: TimestampConverter
  ) {}
  // chartData: any[];
  // view: any[] = [400, 200];
  view: null;
  dataSource;
  firebaseDataMerged: ChartData[];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showDataLabel = true;
  showGridLines = false;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Cal';
  colorScheme = 'nightLights';
  // vivid
  // {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  // };

  onSelect(event): void {
    console.log(event);
  }

  getData(): void {
    const firebaseData = [];

    this.caloriesService.getChartData().subscribe((res) => {
      this.dataSource = res;
      // console.log(this.dataSource);
      this.dataSource.forEach((element) => {
        const date = this.timeConverter.convertTimestampToDate(
          element.payload.doc.data().dateSelected
        );
        // console.log(date.getMonth() + 1);
        // console.log(date.getDate());

        const tmp = {};
        const name = 'name';
        const value = 'value';
        tmp[name] = date.getMonth() + 1 + '/' + date.getDate();
        tmp[value] = Number(element.payload.doc.data().caloriesIntake);
        firebaseData.push(tmp);
      });
      console.log(firebaseData);
      this.firebaseDataMerged = this.mergeDate(firebaseData).reverse();
      console.log(this.firebaseDataMerged);
    });
  }

  ngOnInit(): void {
    this.getData();
  }


  mergeDate(inputData): any[] {
    const tmpObject = {};
    const tmpCount = {};
    const result = [];

    inputData.forEach((e) => {
      if (!tmpObject[e.name]) {
        tmpObject[e.name] = 0;
        tmpCount[e.name] = 0;
      }

      tmpObject[e.name] += e.value;
      tmpCount[e.name]++;
    });

    for (const item in tmpObject) {
      if (tmpObject.hasOwnProperty(item)) {
        result.push({ name: item, value: tmpObject[item] });
      }
    }
    return result;
  }
}
