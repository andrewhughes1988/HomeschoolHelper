import { Injectable, OnInit } from '@angular/core';
import Record from './models/record';
import Student from './models/student';
import Subject from './models/subject';
import User from './models/user';
import axios from 'axios';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserDataService implements OnInit {

  user: User = new User();

  private records: Array<Record> = [];
  private students: Array<Student> = [];
  private subjects: Array<Subject> = [];

  constructor() { }
  ngOnInit(): void {
  }

  async load_user_data(){
    let token = localStorage.getItem('token');

    if(token) {
      let user_data: any = jwt_decode(token);
      const tokenNotExpired: boolean = new Date(0).setUTCSeconds(user_data.exp) > Date.now()

      if(tokenNotExpired) {
        this.user.loggedIn = true;
        this.user.token = token;
        this.user.id = parseInt(user_data.nameid);
        this.user.name = user_data.given_name;

        await axios.get('http://localhost:5000/student/all', {headers: {'Authorization': `Bearer ${token}`} })
          .then(res => this.students = res.data.data)
          .catch();

        await axios.get('http://localhost:5000/subject/all', {headers: {'Authorization': `Bearer ${token}`} })
          .then(res => this.subjects = res.data.data)
          .catch();

        await axios.get('http://localhost:5000/record/all', {headers: {'Authorization': `Bearer ${token}`} })
          .then(res => {
            this.records = res.data.data.map(record => {
              let studentName = this.get_student_by_id(record.studentId).name;
              let subjectName = this.get_subject_by_id(record.subjectId).name;

              return new Record(record.id, record.studentId, studentName, 
                    record.subjectId, subjectName, record.hours, record.minutes, record.date, record.notes);
            })
          })
          .catch();
        
      }

      /*TOKEN EXPIRED, CLEAR STORAGE*/
      else {
        this.logout();
      }

    }

  }

  async login(email, password) {

    let response = null;

    await axios.post('http://localhost:5000/authentication/login', {email, password})

    .then(res => {
      response = res.data;

      if(response.success == true) {
        let user_data: any;

        this.user.loggedIn = true;
        this.user.token = response.data;

        user_data = jwt_decode(this.user.token);

        this.user.id = parseInt(user_data.nameid);
        this.user.name = user_data.given_name;

        localStorage.setItem('token', this.user.token);
      }
    })
    .catch(e => { response = e.response.data });

    return response;
    
  }


  async register(name, email, password) {

    let response = null;

    await axios.post('http://localhost:5000/authentication/register', {name, email, password})

    .then(res => { response = res.data;})

    .catch(e => { response = e.response.data; });

    return response;
  }

  logout() {
    this.user.loggedIn = false;
    this.user.token = null;
    this.user.name = null;
    this.user.id = null;

    localStorage.removeItem('token');
  }

  async add_record(studentId, subjectId, hours, minutes, date, notes){
    let response = null;
    date = new Date(date);

    await axios.post('http://localhost:5000/record', {studentId, subjectId, hours, minutes, date, notes}, {headers: {'Authorization': `Bearer ${this.user.token}`}})

    .then(res => { response = res.data;})

    .catch(e => { response = e.response.data;});

    await this.load_user_data();
    
    return response;
  }

  async add_student(name) {
    let response = null;

    await axios.post('http://localhost:5000/student', {name}, {headers: {'Authorization': `Bearer ${this.user.token}`}})

    .then(res => { response = res.data;})

    .catch(e => { response = e.response.data;});

    await this.load_user_data();
    
    return response;

  }

  async add_subject(name, isCore){
    let response = null;

    await axios.post('http://localhost:5000/subject', {name, isCore}, {headers: {'Authorization': `Bearer ${this.user.token}`}})

    .then(res => { response = res.data; })

    .catch(e => { response = e.response.data; });

    await this.load_user_data();
    
    return response;
  }

  async delete_record(id: number){
    let response = null;

    await axios.delete(`http://localhost:5000/record/${id}`, {
      headers: { 'Authorization': `Bearer ${this.user.token}`}
      
    })
    .then( res => { response = res.data; })
    .catch(e => { response = e.response.data; });

    await this.load_user_data();

    return response;

  }

  async delete_student(id: number){
    let response = null;

    await axios.delete(`http://localhost:5000/student/${id}`, {
      headers: { 'Authorization': `Bearer ${this.user.token}`}
      
    })
    .then( res => { response = res.data; })
    .catch(e => { response = e.response.data; });

    await this.load_user_data();

    return response;
  }

  async delete_subject(id: number){
    let response = null;

    await axios.delete(`http://localhost:5000/subject/${id}`, {
      headers: { 'Authorization': `Bearer ${this.user.token}`}
      
    })
    .then( res => { response = res.data; })
    .catch(e => { response = e.response.data;  });

    await this.load_user_data();

    return response;
  }

  get_records() {
    return this.records;
  }

  get_students() {
    return this.students;
  }

  get_subjects() {
    return this.subjects;
  }

  get_record_by_id(id: number):Record {
    return this.records.find(item => item.id == id);
  }

  get_student_by_id(id: number):Student {
    return this.students.find(item => item.id == id);
  }

  get_subject_by_id(id: number):Subject {
    return this.subjects.find(item => item.id == id);
  }

  get_hours_by_id(id: number): number[] {

    const hoursArray: Array<number> = [];

    const records = this.records.filter(record => record.studentId == id);

    records.forEach(record => {
      let hours = record.hours;
      hours += (record.minutes / 60)
      hoursArray.push(hours)
    });

    return hoursArray;
  }

  get_weekly_hours_by_id(id: number): number[] {
    const hoursArray: Array<number> = [];
    const records = this.records.filter(record => record.studentId == id);

    for(let i = 0; i < 7; i++) {
      let date = new Date();
      let hours = 0;

      date.setDate(date.getDate() - i);

      let filteredRecords = records.filter(record => {
        let recordDate = new Date(record.date);
        return recordDate.toDateString() == date.toDateString();
      })

      filteredRecords.forEach(record => {
          hours += record.hours;
          hours += (record.minutes / 60)
        });

      hoursArray.push(hours);
      hours = 0;
     
    }

    return hoursArray.reverse();
  }

  get_records_by_date(date: Date): Record[] {
    let recordsArray: Array<Record>;    

    recordsArray = this.records.filter(record => new Date(record.date).toDateString() == date.toDateString());

    return recordsArray.reverse();
  }
}
