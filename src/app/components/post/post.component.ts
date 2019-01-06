import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { min } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  formNumber = 'primary';
  formNumber1 = 'accent';

  bookForm = new FormGroup({
    bookID: new FormControl('', Validators.required),
    bookTitle: new FormControl('', Validators.required),
    bookPages: new FormControl('', Validators.required),
    bookCopies: new FormControl('', Validators.required),
    bookGenre: new FormControl('', Validators.required),
    bookResume: new FormControl('', Validators.required)
  });

  personForm = new FormGroup({
    personID: new FormControl('', Validators.required),
    personName: new FormControl('', Validators.required),
    personPhone: new FormControl('', Validators.required)
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.bookForm.value);
    this.dataService.postBook(this.bookForm.value);
  };

  onSubmit1() {
    // TODO: Use EventEmitter with form value
    console.warn(this.personForm.value);
    this.dataService.postPerson(this.personForm.value);
  };

  changeForm() {
    if (this.formNumber == 'primary'){
      this.formNumber1 = 'primary';
      this.formNumber = 'accent';
    }
    else{
      this.formNumber1='accent';
      this.formNumber="primary";
    }
  }
}
