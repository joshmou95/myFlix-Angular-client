import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-dialog',
  templateUrl: './director-dialog.component.html',
  styleUrls: ['./director-dialog.component.scss']
})

export class DirectorDialogComponent implements OnInit {

  constructor(
    // retrieve data from movie-card openDirectorDialog()
    @Inject(MAT_DIALOG_DATA)
    public data: any) { }

  ngOnInit(): void {
  }

}
