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

/**
 * This class displays movie info on cards
 */
export class MovieCardComponent implements OnInit {
  /**
   * movies and favorites variables declared as arrays
   */
  movies: any[] = [];
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

  /**
   * fetch movies from the API with getAllMovies()
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log('getMovies() reached');
      return this.movies;
    });
  }

  /**
   * get FavoriteMovies array from user object
   */
  getUserFavs(): void {
    this.fetchApiData.getUser().subscribe((resp: any) =>{
      this.favorites = resp.FavoriteMovies;
      console.log('getUserFavs() reached');
      return this.favorites
    });
  }

  /**
   * Add movie to user favorites array with addFavorite() with mat-icon
   * @param id movie id
   * @param title movie title
   * @returns favorites array
   */
  addFavoriteButton(id: string, title: string): void {
    this.fetchApiData.addFavorite(id).subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      // message to user when icon is clicked
      this.snackBar.open(`${title} has been added to your favorites`, 'OK', {
        duration: 3000,
      });
      return this.favorites
    });
  }

  /**
   * Remove movie from favorites array in user object with removeFavorite() with mat-icon
   * @param id movie id
   * @param title movie title
   * @returns favorites array
   */
  removeFavoriteButton(id: string, title: string): void {
    this.fetchApiData.removeFavorite(id).subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      // message to user when icon is clicked
      this.snackBar.open(`${title} has been removed from your favorites`, 'OK', {
        duration: 3000,
      });
      return this.favorites
    });
  }

  /**
   * Return true if movie id is in favorites and sets the icon to reflect status
   * @param id movie id
   * @returns true or false if id is in favorites array
   */
  setFaveStatus(id: any): any {
    if (this.favorites.includes(id)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * genre-dialog opened when Genre button is clicked
   * @param name genre name
   * @param description genre description
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      // pass genre data to genre dialog component
      data: {
        name: name, 
        description: description
      }
    } );
  }

  /**
   * director-dialog opened when Director button is clicked
   * @param name director name
   * @param bio director bio
   */
  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(DirectorDialogComponent, {
      // pass director data to director dialog component
      data: {
        name: name, 
        bio: bio
      }
    } );
  }

  /**
   * details-dialog opened when Synopsis button is clicked
   * @param title movie title
   * @param description movie description
   * @param image movie image
   */
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
