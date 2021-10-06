import { Component, OnInit } from '@angular/core';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {


  constructor(
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  // Logs out current user
  userLogout () {
    console.log('userLogout Reached')
    // remove token and user from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // send message to user that logout was successful
    this.snackBar.open(`Logout was successful!`, 'OK', {
      duration: 3000,
    });
    
  }
}
