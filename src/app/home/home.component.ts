import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import User from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;
  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.user = this.userDataService.user;
  }

  

}
