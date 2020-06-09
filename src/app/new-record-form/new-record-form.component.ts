import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';
import Student from '../models/student';
import Subject from '../models/subject';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-record-form',
  templateUrl: './new-record-form.component.html',
  styleUrls: ['./new-record-form.component.scss']
})
export class NewRecordFormComponent implements OnInit {

  students: Array<Student> = [];
  subjects: Array<Subject> = [];
  
  selectedStudentId: number;
  selectedSubjectId: number;
  date: Date;
  hours: number;
  minutes: number;
  notes: string;
  message: string;


  constructor(private userDataService: UserDataService, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    
    if(this.userDataService.user.loggedIn == false) {
      this.router.navigate(['/']);
    }
    else {
      this.resetForm();
    }


  }

  async submit() {

    this.normalizeTimeValues();

    const response = await this.userDataService.add_record(this.selectedStudentId, this.selectedSubjectId, 
        this.hours, this.minutes, this.date, this.notes);

    if(response.success) {
      this.resetForm();
    }

    this.snackbar.open(response.message, null, { duration: 2000 });

  }

  async getUserData() {
    await this.userDataService.load_user_data()
  
    this.students = this.userDataService.get_students();
    this.subjects = this.userDataService.get_subjects();    
    
  }

  async resetForm() {
    await this.getUserData();

    if(Array.isArray(this.students) && this.students.length > 0) {
      this.selectedStudentId = this.students[0].id;
    }

    if(Array.isArray(this.subjects) && this.subjects.length > 0) {
      this.selectedSubjectId = this.subjects[0].id;
    }
    
    this.date = new Date(Date.now());
    this.hours = 0;
    this.minutes = 0;
    this.notes = "";
  }

  //If more than 60 minutes, converts to hours and remaining minutes.
  normalizeTimeValues() {
    if(!(this.hours >= 0)) {
      this.hours = 0;
    }

    if(!(this.minutes >= 0)) {
      this.minutes = 0;
    }

    if(this.minutes >= 60) {
      this.hours += ((this.minutes - (this.minutes % 60)) / 60);
      this.minutes = this.minutes % 60;
    }
  }


}
