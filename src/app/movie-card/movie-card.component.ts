import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {
  // movies variable declared as an array
  movies: any[] = [];
  user: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService, 
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) { }

  // called when Angular is done creating the component
  ngOnInit(): void {
    this.getMovies();
    this.getUserFavs();
  }

  // fetch movies from the API with getAllMovies()
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log('getMovies() reached', this.movies);
      return this.movies;
    });
  }

  // get FavoriteMovies array from user object
  getUserFavs(): void {
    this.fetchApiData.getUser().subscribe((resp: any) =>{
      this.favorites = resp.FavoriteMovies;
      return this.favorites
    });
  }

  // add movie to user favorites array
  addFavoriteButton(id: string, title: string): void {
    this.fetchApiData.addFavorite(id).subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      this.snackBar.open(`${title} has been added to your favorites`, 'OK', {
        duration: 3000,
      });
      return this.favorites
    });
  }

  // remove movie from favorites array in user object
  removeFavoriteButton(id: string, title: string): void {
    this.fetchApiData.removeFavorite(id).subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      this.snackBar.open(`${title} has been removed from your favorites`, 'OK', {
        duration: 3000,
      });
      return this.favorites
    });
  }

  // return true if is in favorites and sets the icon to reflect status
  setFaveStatus(id: any): any {
    if (this.favorites.includes(id)) {
      return true;
    } else {
      return false;
    }
  }

  // dialog opened when Genre button is clicked
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      // pass genre data to genre dialog component
      data: {
        name: name, 
        description: description
      }
    } );
  }

  // dialog opened when Director button is clicked
  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(DirectorDialogComponent, {
      // pass director data to director dialog component
      data: {
        name: name, 
        bio: bio
      }
    } );
  }

  // dialog opened when Synopsis button is clicked
  openDetailsDialog(title: string, description: string, image: string ): void {
    this.dialog.open(DetailsDialogComponent, {
      // pass movie data to details dialog component
      data: {
        title: title,
        description: description,
        image: image
      }
    } );
  }

}
