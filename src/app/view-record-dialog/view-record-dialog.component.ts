import { Component, OnInit, Inject } from '@angular/core';
import Record from '../models/record';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-view-record-dialog',
  templateUrl: './view-record-dialog.component.html',
  styleUrls: ['./view-record-dialog.component.scss']
})
export class ViewRecordDialogComponent implements OnInit {

  record: Record;
  constructor(private dialogRef: MatDialogRef<ViewRecordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.record = data;
    }

  ngOnInit(): void {
  }

  formatDate(date): string {
    return new Date(date).toLocaleDateString('en-US');
  }

}
