import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favorites: any[] = [];
  username = localStorage.getItem('user');


  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log('getUserData reached', resp)
    });
  }


  // get FavoriteMovies array from user object
  getUserFavs(): void {
    this.fetchApiData.getUser().subscribe((resp: any) =>{
      this.favorites = resp.FavoriteMovies;
      return this.favorites
    });
  }

  deleteUserData(): void {
    let check = confirm(
      'This will delete your profile! Are you sure you want to continue?'
    );
    if (check) {
      this.fetchApiData.deleteUser().subscribe(() => {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Profile deleted', 'OK', {
          duration: 2000,
        });
      });
    } else {
      window.location.reload();
    }
  }
  // profileUpdateDialog(): void {
  //   this.dialog.open(UserProfileUpdateComponent, {
  //     panelClass: 'update-dialog',
  //   });
  // }

}
