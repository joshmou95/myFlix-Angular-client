import { Component, OnInit, Input } from '@angular/core';
// This import will close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


// component can be used in the html file as <app-user-registration-form>
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

/**
 * This class displays the user registration form
 */
export class UserRegistrationFormComponent implements OnInit {
  isLoading = false;

  /**
   * defines the components input, userData object is passed to the API call in the registerUser function
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  /**
   * Send the form inputs to register user at the API
   */
  registerUser(): void {
      this.isLoading = true;
      this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      this.isLoading = false;
      // This will close the modal on success!
      this.dialogRef.close(); 
      console.log('registerUser successful');
      // message to user when registration is a success
      this.snackBar.open(`You are now registered and can log in!`, 'OK', {
          duration: 3000
      });
      }, (response) => {
        this.isLoading = false;
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000
        });
      });
    }
}
