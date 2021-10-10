import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserProfileUpdateComponent } from '../user-profile-update/user-profile-update.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

/**
 * This class displays the user profile
 */
export class UserProfileComponent implements OnInit {
  user: any = {};
  favorites: any = [];
  movies: any[] = [];
  username = localStorage.getItem('user');


  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  /**
   *  gets user data upon page load
   */
  ngOnInit(): void {
    this.getUserData();
  }

  /**
   * get user object with username, email, birthday, and Favorite movies triggers getMovies()
   */
  getUserData(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.getMovies();
    });
  }


  /**
   * gets Movies data and triggers filterFavorites
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filterFavorites();
    });
  }

  /**
   * filter Favorite movies from movies data returns user favorites to array
   * @returns favorites array
   */
  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.FavoriteMovies.includes(movie._id)) {
        this.favorites.push(movie);
      }
    });
    return this.favorites;
  }
    
  /**
   * with "Update Profile" button is pressed, it passes data to UserProfileUpdateComponent for update
   * @param username 
   * @param email 
   * @param birthday 
   */
  openProfileUpdateDialog(username: string, email: string, birthday: string): void {
    // pass data to user profile update component
    this.dialog.open(UserProfileUpdateComponent, {
      data: {
        username: username,
        email: email,
        birthday: birthday
      },
      width: '250px'
    });
  }

  /**
   * when "Delete Account" button is pressed it deletes the user from the API after confirmation
   */
  deleteUserData(): void {
    let check = confirm(
      'This will delete your profile! Are you sure you want to continue?'
    );
    if (check == true) {
      this.fetchApiData.deleteUser().subscribe(() => {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Profile deleted', 'OK', {
          duration: 2000,
        });
      });
    } else {
      this.router.navigate(['users']);
    }
  }
}
