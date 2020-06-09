import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserDataService } from '../user-data.service';
import User from '../models/user';
import { Router } from '@angular/router';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild('drawer') drawer: any;
  user: User;  
  isMobile$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Large)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  loggedInUserMenu = [
    {
      title: 'Home', 
      path: '/',
      icon: 'home'
    },
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: 'analytics'
    },   
    {
      title: 'Add Student',
      path: '/new-student',
      icon: 'person_add'
    },
    {
      title: 'Add Subject',
      path: '/new-subject',
      icon: 'create_new_folder'
    },
    {
      title: 'Add Record',
      path: '/new-record',
      icon: 'playlist_add'
    },   

  ]


  constructor(private breakpointObserver: BreakpointObserver, 
      private userDataService: UserDataService, private router: Router, public dialog: MatDialog, private snackbar: MatSnackBar) {}
  ngOnInit(): void {
    this.userDataService.load_user_data();
    this.user = this.userDataService.user;
  }

  logout() {
    this.userDataService.logout();
    this.router.navigate(['/']);
  }

  async register(name, email, password) {

    const response = await this.userDataService.register(name, email, password);
    
    if(response) {
      this.snackbar.open(response.message, null, { duration: 2000 });
    }

    else {
      this.snackbar.open('An error occurred during registration. Please try again.', null, { duration: 2000 });
    }

  }

  async login(email, password) {

    const response = await this.userDataService.login(email, password);

    if(response.success) {
      this.router.navigate(['/']);
    }

  }

  closeSideNav() {
    if (this.drawer._mode=='over') {
      this.drawer.close();
    }
  }

  openRegistrationDialog() {
    const dialogRef = this.dialog.open(RegisterDialogComponent, 
      {
        width: '350px'
      });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.register(result.name, result.email, result.password);   
      }
    });
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, 
      {
        width: '350px'
      });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.login(result.email, result.password);
      }
    });
  }

  
}
