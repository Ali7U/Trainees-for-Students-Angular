import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TraineeCourseService } from '../../Services/trainee-course.service';
import { ITraineeCourse } from '../../interfaces/ITraineeCourse';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { CompanyService } from '../../Services/company.service';
import { IApplication } from '../../interfaces/IApplication';
import { ApplicationService } from '../../Services/application.service';
import { jwtDecode } from 'jwt-decode';
import { ICompany } from '../../interfaces/ICompany';
import { ApplicationIdComponent } from '../application-id/application-id.component';
import { SharedIdService } from '../../shared/shared-id.service';

@Component({
  selector: 'app-company-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    ButtonModule,
    NgClass,
    NgFor,
    ApplicationIdComponent,
    NgIf,
  ],
  templateUrl: './company-dashboard.component.html',
  styleUrl: './company-dashboard.component.css',
})
export class CompanyDashboardComponent implements OnInit {
  trainees: ITraineeCourse[] = [];
  companyId!: number;
  applications: IApplication[] = [];
  companyName: string = '';
  companyById: ICompany[] = [];
  traineeId!: number;
  public selectedTraineeCourseId!: number;

  constructor(
    private router: Router,
    private traineeCourseService: TraineeCourseService,
    private applicationService: ApplicationService,
    private companyService: CompanyService,
    private sharedIdService: SharedIdService
  ) {}

  ngOnInit(): void {
    this.getCompanyIdFromToken();
    // this.companyId =
    console.log(this.companyId);

    this.CompanyById();
  }

  // async loadTrainees() {
  //   // this.traineeCourseService
  //   //   .getAllTraineesById(this.companyId)
  //   //   .subscribe((res) => {
  //   //     this.trainees = res;
  //   //     console.log(this.companyId);
  //   //   });
  // }

  CompanyById() {
    this.companyService.getCompanyById(this.companyId).subscribe((res) => {
      this.companyById = res;
      res
        .filter((company) => this.companyId === company.companyId)
        .map((item) =>
          item.traineecourses.map((item) =>
            item.applications.map(
              (item) => (this.selectedTraineeCourseId = item.traineeCourseId),
              console.log(item.traineeCourseId)
            )
          )
        );
    });
  }

  navigate() {
    return this.router.navigate(['add-trainee']);
  }

  onShowApplication(traineeCourseId: number) {
    // Set the shared ID in the service
    // this.sharedIdService.changeTraineeCourseId(traineeCourseId);
    // Navigate to the application component
    this.router.navigate(['/application', traineeCourseId]);
    this.sharedIdService.setTraineeId(traineeCourseId)
    
  }
  // sendApplication(application: IApplication[]) {
  //   this.applicationService.sendApplications(application);
  // }

  private getCompanyIdFromToken(): number | null {
    const token = localStorage.getItem('companyToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.companyId = Number(decodedToken.CompanyId);
      return Number(decodedToken.CompanyId);
    }
    return null;
  }

  sendApplication(applications: any[]) {
    if (applications && applications.length > 0) {
      const traineeCourseId = applications[0]?.traineeCourseId; // Use optional chaining
      if (traineeCourseId !== undefined && traineeCourseId !== null) {
        this.router.navigate(['/application', traineeCourseId]);
      } else {
        console.error('TraineeCourseId is not defined.');
      }
    } else {
      console.error('No applications found for this trainee.');
    }
  }
}
