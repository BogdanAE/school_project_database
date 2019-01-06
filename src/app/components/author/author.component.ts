import { Component, OnInit } from '@angular/core';
import { BooksService} from '../../services/books.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  author;
  books;
  value = null;
  uBooks;
  displayedColumns1: string[];
  displayedColumns2: string[];

  // panelOpenState = false;

  constructor(private booksService: BooksService,
              private dataService: DataService          
    ) { }

  ngOnInit() {
    this.displayedColumns1 = null;
    this.displayedColumns2 = null;
    this.dataService.getBooks().subscribe(data => {
      this.books = data;
      console.log(this.books);

    });
  }

  getAuthor(){
    this.displayedColumns1 = ['nume'];
    this.dataService.getAuthor(this.value).subscribe(data => {
      this.author = data;
      console.log(this.author);
      console.log('value', this.value);
    })
  };

  getMultipleAuthors(){
    this.displayedColumns2 = ['Id carte'];
    this.dataService.getMultipleAuthors().subscribe(data => {
      this.uBooks = data;
      console.log(this.books);
    })
  }

}
