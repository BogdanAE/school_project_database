import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import "rxjs/add/operator/map";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get('http://localhost:3000/books');
  }

  getEven(value): Observable<any> {
    return this.http.get('http://localhost:3000/' + value)
      .pipe(
        map(data => {
          console.log(data);
          return data;
        }));
  };

  getDelayed(): Observable<any> {
    return this.http.get('http://localhost:3000/delayed');
  };

  getGenre() {
    return this.http.get('http://localhost:3000/genre');
  };

  getPersons() {
    return this.http.get('http://localhost:3000/persons');
  };

  getAuthor(book) {
    return this.http.get('http://localhost:3000/author/' + book);
  };

  getMultipleAuthors() {
    return this.http.get('http://localhost:3000/multiple');
  };

  getMostLend() {
    return this.http.get('http://localhost:3000/mostlend');
  };

  getAveragePages() {
    return this.http.get('http://localhost:3000/averagepages')
  };

  getUsername(username,password){
    return this.http.get('http://localhost:3000/login/' + username + '/' + password);
  };

  postBook(object){
    console.warn(object);
    this.http.post('http://localhost:3000/postBook', object).subscribe(
      (res) => {console.log(res)},
      (err) => {console.log(err)}
    );
  };

  postPerson(object){
    console.warn(object);
    this.http.post('http://localhost:3000/postPersoana', object).subscribe(
      (res) => {console.log(res)},
      (err) => {console.log(err)}
    );
  }

}
