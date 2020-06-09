import { Component, OnInit } from '@angular/core';
import { UserDataService } from './user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'HomeschoolHelper';
  
  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {}


}
