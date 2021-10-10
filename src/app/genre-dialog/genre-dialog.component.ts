import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.scss']
})

/**
 * This class displays moive genre name and description
 */
export class GenreDialogComponent implements OnInit {

  constructor(
    /**
     * retrieve data from movie-card openGenreDialog()
     */
    @Inject(MAT_DIALOG_DATA)
    public data: any) { }

  ngOnInit(): void {
  }
}
