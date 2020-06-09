import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  email;
  password;

  constructor(private dialogRef: MatDialogRef<LoginDialogComponent>) { 
      
    }


  ngOnInit(): void {
  }

  submit() {
    this.dialogRef.close({email: this.email, password: this.password});
  }

}
