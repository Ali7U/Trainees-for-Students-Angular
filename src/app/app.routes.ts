import { Routes } from '@angular/router';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { CompanyDashboardComponent } from './pages/company-dashboard/company-dashboard.component';
import { LoginForCompanyComponent } from './pages/login-for-company/login-for-company.component';
import { RegisterForCompanyComponent } from './pages/register-for-company/register-for-company.component';
import { HomeComponent } from './pages/home/home.component';
import { AddTraineeComponent } from './pages/add-trainee/add-trainee.component';
import { ApplicationIdComponent } from './pages/application-id/application-id.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'login-for-company', component: LoginForCompanyComponent },
  { path: 'register-for-company', component: RegisterForCompanyComponent },
  { path: 'add-trainee', component: AddTraineeComponent },
  { path: 'company-dashboard', component: CompanyDashboardComponent },
  { path: 'application/:id', component: ApplicationIdComponent },
  { path: 'student/:id', component: StudentDashboardComponent },
];
