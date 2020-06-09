import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewStudentFormComponent } from './new-student-form/new-student-form.component';
import { NewSubjectFormComponent } from './new-subject-form/new-subject-form.component';
import { NewRecordFormComponent } from './new-record-form/new-record-form.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';




const routes: Routes = [
  { path: 'new-student', component: NewStudentFormComponent },
  { path: 'new-subject', component: NewSubjectFormComponent },
  { path: 'new-record', component: NewRecordFormComponent },
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {  onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
