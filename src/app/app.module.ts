import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NewStudentFormComponent } from './new-student-form/new-student-form.component';
import { NewSubjectFormComponent } from './new-subject-form/new-subject-form.component';
import { NewRecordFormComponent } from './new-record-form/new-record-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { UserDataService } from './user-data.service';
import { MainComponent } from './main/main.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularMaterialModule } from './angular-material.module';
import { ChartsModule } from 'ng2-charts';
import { DeleteStudentDialogComponent } from './delete-student-dialog/delete-student-dialog.component';
import { DeleteSubjectDialogComponent } from './delete-subject-dialog/delete-subject-dialog.component';
import { DeleteRecordDialogComponent } from './delete-record-dialog/delete-record-dialog.component';
import { ViewRecordDialogComponent } from './view-record-dialog/view-record-dialog.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NewStudentFormComponent,
    NewSubjectFormComponent,
    NewRecordFormComponent,
    DashboardComponent,
    HomeComponent,
    MainComponent,
    DeleteStudentDialogComponent,
    DeleteSubjectDialogComponent,
    DeleteRecordDialogComponent,
    ViewRecordDialogComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule, 
    FormsModule, LayoutModule,  
    FontAwesomeModule,
    AngularMaterialModule,
    ChartsModule,
  ],
  providers: [ UserDataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
