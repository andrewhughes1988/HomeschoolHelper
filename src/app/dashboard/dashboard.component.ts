import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';
import Student from '../models/student';
import Record from '../models/record';
import Subject from '../models/subject';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteStudentDialogComponent } from '../delete-student-dialog/delete-student-dialog.component';
import { DeleteSubjectDialogComponent } from '../delete-subject-dialog/delete-subject-dialog.component';
import { DeleteRecordDialogComponent } from '../delete-record-dialog/delete-record-dialog.component';
import { MatTable } from '@angular/material/table';
import { ViewRecordDialogComponent } from '../view-record-dialog/view-record-dialog.component';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [{ data: null }];
  public lineChartLabels: Label[] = this.displayLastSevenDays();
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
     
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
      ]
    },
    annotation: {
      annotations: [
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // blue rgb(51, 102, 255)
      backgroundColor: 'rgba(51,102,255,0.2)',
      borderColor: 'rgba(51,102,255,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(51,102,255,0.8)'
    },
    { // dark grey rgb(51,102,255)
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red rgb(255,0,0)
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  @ViewChild(MatTable) table: MatTable<any>;

  students: Array<Student> = [];
  subjects: Array<Subject> = []
  records: Array<Record> = [];
  public recordDate;
  public filteredRecords: Array<Record>;

  recordColumns: string[] = ['student', 'subject', 'date', 'hours', 'delete', 'view'];

  constructor(private userDataService: UserDataService, private router: Router, 
      private snackbar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.userDataService.user.loggedIn == false) {
      this.router.navigate(['/']);
    }
    else {
      this.getUserData();
      this.recordDate;
    }
  }

  formatDate(date): string {
    return new Date(date).toLocaleDateString('en-US');
  }

  openViewRecordDialog(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.userDataService.get_record_by_id(id);
    const dialogRef = this.dialog.open(ViewRecordDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDeleteRecordDialog(id) {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteRecord(id);
      }
    });

  }
  
  openDeleteStudentDialog(id) {
    const dialogRef = this.dialog.open(DeleteStudentDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteStudent(id);
      }
    });

  }

  openDeleteSubjectDialog(id) {
    const dialogRef = this.dialog.open(DeleteSubjectDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteSubject(id);
      }
    });
  }

  async deleteRecord(id) {
    const response = await this.userDataService.delete_record(id);
    this.records = this.records.filter(record => record.id != id);
    this.snackbar.open(response.message, null, { duration: 2000 });
    this.getUserData();
  }

  async deleteStudent(id) {
    const response = await this.userDataService.delete_student(id);
    this.students = this.students.filter(student => student.id != id);
    this.snackbar.open(response.message, null, { duration: 2000 });
    this.getUserData();
  }

  async deleteSubject(id) {
    const response = await this.userDataService.delete_subject(id);
    this.subjects = this.subjects.filter(subject => subject.id != id);
    this.snackbar.open(response.message, null, { duration: 2000 });
    this.getUserData();
  }

  displayLastSevenDays(): Array<string> {
    const days = [];
    
    for(let i = 0; i < 7; i++) {
      let today = new Date();
      today.setDate(today.getDate() - i);

      days.unshift(today.toLocaleDateString('en-US').slice(0, -5));
    }
    return days;
  }

  loadChartData() {
    this.lineChartData = [];
    this.students.forEach(student => {

      this.lineChartData.push({
        data: this.userDataService.get_weekly_hours_by_id(student.id),
        label: student.name
      })
      
    });

  }

  async getUserData() {
    await this.userDataService.load_user_data()
  
    this.students = this.userDataService.get_students();
    this.subjects = this.userDataService.get_subjects();
    this.records = this.userDataService.get_records();
    this.records = this.records.reverse();
    this.loadChartData();

    if(this.table) {
      this.table.renderRows();
    }
        
  }

  showRecordsByDate() {
    this.filteredRecords = this.userDataService.get_records_by_date(this.recordDate);
    if(this.filteredRecords.length > 0) {
      this.snackbar.open("Records loaded. Scroll down to view.", null, { duration: 2000 });
    }

    else {
      this.snackbar.open(`No record entries for ${this.recordDate.toLocaleDateString('en-US')}`, null, { duration: 2000 });
    }
  }

  public savePDF():void {
    let doc = new jsPDF();
    doc.autoTable({html: '#data' });
    doc.save(`homeschool_records_${Date.now()}`);
  }

}
