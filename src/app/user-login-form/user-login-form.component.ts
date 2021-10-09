import { Component, OnInit, Input } from '@angular/core';
// This import will close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
// import Router module
import { Router } from '@angular/router';


// component can be used in the html file as <app-user-login-form>
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {
  isLoading = false;
  
  // defines the components input, userData object is passed to the API call in the LoginUser function
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public router: Router, 
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.isLoading = true;
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      this.isLoading = false;
    // This will close the modal on success
    this.dialogRef.close();
    // store username and token in local storage
    localStorage.setItem('user', response.user.Username);
    localStorage.setItem('token', response.token);
    // navigate to the movie card view for all movies
    this.router.navigate(['movies']);
    console.log('loginUser success');
    // message to user upon login
    this.snackBar.open('Login was successful!', 'OK', {
        duration: 2000
    });
    }, (response) => {
      this.isLoading = false;
      console.log('loginUser response 2');
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

}
