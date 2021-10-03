import { Component, OnInit, Input } from '@angular/core';
// This import will close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      console.log('loginUser', response);
  // Logic for a successful user registration goes here! (To be implemented)
    this.dialogRef.close(); // This will close the modal on success!
    
    localStorage.setItem('user', response.user.Username);
    localStorage.setItem('token', response.token);

    
    this.snackBar.open(response, 'OK', {
        duration: 2000
    });
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

}
