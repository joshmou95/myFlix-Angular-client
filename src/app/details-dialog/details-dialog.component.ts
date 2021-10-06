import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss']
})

export class DetailsDialogComponent implements OnInit {

  constructor(
    // retrieve data from movie-card openDetailsDialog()
    @Inject(MAT_DIALOG_DATA)
    public data: any) { }

  ngOnInit(): void {
  }

}
