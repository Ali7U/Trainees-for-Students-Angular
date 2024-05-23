import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../Services/application.service';
import { IApplication } from '../../interfaces/IApplication';
import { TraineeCourseService } from '../../Services/trainee-course.service';
import { ITraineeCourse } from '../../interfaces/ITraineeCourse';
import { CompanyService } from '../../Services/company.service';
import { ICompany } from '../../interfaces/ICompany';
import { UserService } from '../../Services/user.service';
import { jwtDecode } from 'jwt-decode';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ApplicationStatus } from '../../interfaces/ApplicationStatus';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ConfirmDialogModule, ToastModule, NgFor, NgIf, CommonModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  trainees: ITraineeCourse[] = [];
  companies: ICompany[] = [];
  token: any;
  userId: number | null = null;
  traineeId: ITraineeCourse | null = null;
  disabled: boolean = false;
  disabledButtons: { [key: number]: boolean } = {};

  msg: string = '';

  constructor(
    private traineeCourseService: TraineeCourseService,
    private companyService: CompanyService,
    private userService: UserService,
    private applicationService: ApplicationService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.companyService.getAllCompanies().subscribe((res) => {
      this.companies = res;
      // this.trainees = this.companies
      console.log(this.companies);
    });
    this.traineeCourseService.getAllTrainees().subscribe((res) => {
      this.trainees = res;
      console.log(res);
      console.log(this.trainees.filter(id  => id.traineeCourseId));
      this.traineeId = this.trainees[3];
      console.log(this.traineeId);
    });

    this.applicationService
      .getApplications()
      .subscribe((res) => console.log(res));

    console.log(this.getUserIdFromToken());

    //   this.disabledButton[trainee.traineeCourseId] = disabledState === 'true';
  }

  getApplicationsByTraineeCourseId(traineeCourseId: number): IApplication[] {
    return (
      this.trainees.find(
        (trainee) => trainee.traineeCourseId === traineeCourseId
      )?.applications || []
    );
  }

  createApplication(traineeId: number) {
    const userId = this.getUserIdFromToken();
    // cons

    if (userId) {
      const application: IApplication = {
        traineeCourseId: traineeId,
        userId: userId,
        status: ApplicationStatus.Pending,
      };

      this.applicationService.createApplication(application).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Application created successfully',
          });
        },
        (error) => {
          console.error('Error creating application:', error);
          this.msg = 'Error creating application';

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create application',
          });
        }
      );
    } else {
      console.error('User ID not found or company not selected.');
      // Show error message
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'User ID not found or company not selected.',
      });
    }
  }

  private getUserIdFromToken(): number | null {
    const token = localStorage.getItem('Token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return Number(decodedToken.userId);
    }
    return null;
  }
}
