import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-student-form',
  templateUrl: './new-student-form.component.html',
  styleUrls: ['./new-student-form.component.scss']
})
export class NewStudentFormComponent implements OnInit {

  name: string;
  message: string;

  constructor(private userDataService: UserDataService, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    
    if(this.userDataService.user.loggedIn == false) {
      this.router.navigate(['/']);
    }
  }

  async submit() {
    
    const response = await this.userDataService.add_student(this.name);

    if(response.success) {
      this.name = "";
    }

    this.snackbar.open(response.message, null, { duration: 2000 });


  }
}
