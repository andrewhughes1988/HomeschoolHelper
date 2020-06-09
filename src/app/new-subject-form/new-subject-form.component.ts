import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-subject-form',
  templateUrl: './new-subject-form.component.html',
  styleUrls: ['./new-subject-form.component.scss']
})
export class NewSubjectFormComponent implements OnInit {

  name: string;
  isCore: boolean = true;
  message: string;

  constructor(private userDataService: UserDataService, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    
    if(this.userDataService.user.loggedIn == false) {
      this.router.navigate(['/']);
    }

  }

  async submit() {
    
    const response = await this.userDataService.add_subject(this.name, this.isCore);

    if(response.success) {
      this.name = "";
    }

    this.snackbar.open(response.message, null, { duration: 2000 });


  }

}
