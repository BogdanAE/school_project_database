import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  titles;
  pages;
  displayedColumns1: string[];
  displayedColumns2: string[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.displayedColumns1 = null;
    this.displayedColumns2 = null;
  }

  getMostLend(){
    this.displayedColumns1 = ['titlu'];
    this.dataService.getMostLend().subscribe(data => {
      this.titles = data;
    })
    console.log(this.titles);

  };

  getAveragePages(){
    this.displayedColumns2 = ['gen', 'pages'];
    this.dataService.getAveragePages().subscribe(data => {
      this.pages = data;
      console.log(this.pages);
    })
    
  };
}
