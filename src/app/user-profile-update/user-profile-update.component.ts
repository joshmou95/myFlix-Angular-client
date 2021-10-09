import { Component, OnInit, Input, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.scss']
})

export class UserProfileUpdateComponent implements OnInit {
  
  // defines the components input, userData object is passed to the API call in the updateUser function
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserProfileUpdateComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  // Update user data via the form 
  updateUser(): void {
    this.fetchApiData.updateUser(this.userData).subscribe((response) => {
      // This will close the modal on success
    this.dialogRef.close(); 
    // get username from local storage
    localStorage.setItem('user', response.Username)
    console.log(response);
    // message to user on update success
    this.snackBar.open(`Update Successful!`, 'OK', {
        duration: 3000
    });
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
    // reload page upon update
    setTimeout(function () {
      window.location.reload();
     }, 3000);
  }

}
