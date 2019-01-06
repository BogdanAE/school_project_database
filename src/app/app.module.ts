import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { MaterialModule } from './material.component';
import { InfoComponent } from './components/info/info.component';
import { AuthorComponent } from './components/author/author.component';
import { BooksComponent } from './components/books/books.component';

import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './services/data.service';
import { LoginService } from './services/login.service';
import { StatisticsComponent } from './components/statistics/statistics.component';
import  { LoginComponent } from './components/login/login.component';
import { PostComponent } from './components/post/post.component';




const routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: '', component: LoginComponent
  },
  {
    path: 'author', component: AuthorComponent
  },
  {
    path: 'books', component: BooksComponent
  },
  {
    path: 'statistics', component: StatisticsComponent
  },
  {
    path: 'post', component: PostComponent
  },
]

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    AuthorComponent,
    BooksComponent,
    HomeComponent,
    StatisticsComponent,
    LoginComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DataService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
