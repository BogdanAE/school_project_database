import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  constructor(private booksService: BooksService,
    private dataService: DataService
  ) { }

  books;
  query: number = 0;
  displayedColumns: string[] = null;
  value:boolean = null;

  ngOnInit() {
    this.displayedColumns = null;
  }

  submitButton() {
    this.displayedColumns = null;
    this.query = 1;
  }

  getEven() {
    this.query = 1;
    this.displayedColumns = ['title', 'pages', 'gen'];
    this.dataService.getEven(this.value).subscribe(data => {
      this.books = data;
    })
    console.log(this.value);
  };

  getDelayed() {
    this.query = 2;
    this.displayedColumns = ['id_carte', 'id_imp', 'Zile_intarziate'];
    this.dataService.getDelayed().subscribe(data => {
      this.books = data;
    })
  };

  getGenre() {
    this.query = 3;
    this.displayedColumns = ['title1', 'title2'];
    this.dataService.getGenre().subscribe(data => {
      this.books = data;
      console.log(this.books);
    })
  };

  getPersons() {
    this.query = 4;
    this.displayedColumns = ['nume', 'telefon'];
    this.dataService.getPersons().subscribe(data => {
      this.books = data;
      console.log(this.books);
    })
  };

}
