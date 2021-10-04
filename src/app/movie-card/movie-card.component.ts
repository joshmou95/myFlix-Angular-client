import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {
  // movies variable declared as an array
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService, 
    public dialog: MatDialog,
    ) { }

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

  // opens the genre dialog
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        name: name, 
        description: description
      }
    } );
  }

  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(DirectorDialogComponent, {
      data: {
        name: name, 
        bio: bio
      }
    } );
  }

  // openGenreDialog(name: string, description: string): void {
  //   let dialogRef = this.dialog.open(GenreDialogComponent, {
  //     data: { 
  //       name, description
  //      }
  //   });
  // }



}
