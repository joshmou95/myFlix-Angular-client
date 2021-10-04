import { Component, OnInit, Input } from '@angular/core';
// This import will close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';



// component can be used in the html file as <app-user-login-form>
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {
  
  // defines the components input, userData object is passed to the API call in the LoginUser function
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public router: Router, 
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
    // This will close the modal on success
    this.dialogRef.close();
    // store username and token in local storage
    localStorage.setItem('user', response.user.Username);
    localStorage.setItem('token', response.token);
    // navigate to the movie card view for all movies
    this.router.navigate(['movies']);
    console.log('loginUser response 1', response);
    this.snackBar.open(response, 'OK', {
        duration: 2000
    });
    }, (response) => {
      console.log('loginUser response 2', response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

}
