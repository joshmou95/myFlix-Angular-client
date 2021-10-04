import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {
  // movies variable declared as an array
  movies: any[] = [];

  constructor(public fetchApiData: FetchApiDataService) { }

  // called when Angular is done creating the component
  ngOnInit(): void {
    this.getMovies();
  }

  // fetch movies from the API
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log('getMovies() reached', this.movies);
      return this.movies;
    });
  }

}
