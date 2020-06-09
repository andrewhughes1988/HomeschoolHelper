import { Component, OnInit, Inject } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {
  name;
  email;
  password;

  constructor(private dialogRef: MatDialogRef<RegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { 
      
    }


  ngOnInit(): void {
  }

  submit() {
    this.dialogRef.close({name: this.name, email: this.email, password: this.password});
  }
}
