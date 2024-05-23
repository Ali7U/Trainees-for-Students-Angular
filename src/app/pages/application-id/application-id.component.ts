import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IApplication } from '../../interfaces/IApplication';
import { ApplicationService } from '../../Services/application.service';
import { ApplicationStatus } from '../../interfaces/ApplicationStatus';
import { UserService } from '../../Services/user.service';
import { IUser } from '../../interfaces/IUser';
import { MessageService } from 'primeng/api';
import { SharedIdService } from '../../shared/shared-id.service';
import { ApplicationDto } from '../../interfaces/Dto';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-application-id',
  standalone: true,
  imports: [
    NgClass,
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    ToastModule,
    NgFor,
    NgIf,
  ],
  templateUrl: './application-id.component.html',
  providers: [MessageService],
  styleUrl: './application-id.component.css',
})
export class ApplicationIdComponent implements OnInit {
  getTraineeCourseId!: number;
  applications: ApplicationDto[] = [];
  trainees: any[] = [];
  users: IUser[] = [];
  disabledButtons: boolean = false;

  constructor(
    private router: Router,
    private applicationService: ApplicationService,
    private userService: UserService,
    private messageService: MessageService,
    private sharedIdService: SharedIdService
  ) {}

  ngOnInit(): void {
    this.getTraineeCourseId = this.sharedIdService.getTraineeId();
    this.applicationService
      .getApplicationByTraineeId(this.getTraineeCourseId)
      .subscribe((res) => {
        this.trainees = res;
        this.applications = res.flatMap((trainee) => trainee.applications);
      });
  }

  acceptStudent(application: ApplicationDto, traineeId: number) {
    this.updateApplicationStatus(
      application.applicationId,
      ApplicationStatus.Accepted,
      traineeId
    );
    this.disabledButtons = true;
  }

  rejectStudent(application: ApplicationDto, traineeId: number) {
    this.updateApplicationStatus(
      application.applicationId,
      ApplicationStatus.Rejected,
      traineeId
    );
    this.disabledButtons = true;
  }

  private updateApplicationStatus(
    applicationId: number,
    status: ApplicationStatus,
    traineeId: number
  ) {
    const application = this.applications.find(
      (app) => app.applicationId === applicationId
    );
    if (!application) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Application not found.',
        sticky: false,
      });
      return;
    }

    const updateApplication: IApplication = {
      ...application,
      status: status,
    };

    this.applicationService
      .updateApplicationStatus(applicationId, updateApplication)
      .subscribe(
        (res) => {
          this.messageService.add({
            severity: res.status === 'Accepted' ? 'success' : 'error',
            summary: res.status === 'Accepted' ? 'Success' : 'Rejected',
            detail:
              res.status === 'Accepted'
                ? 'Application status accepted successfully'
                : 'Application status rejected successfully',
          });
          application.status = status;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update application status',
            sticky: false,
          });
        }
      );
  }

  isButtonDisabled(application: ApplicationDto, trainee: any): boolean {
    return (
      application?.status === 'Accepted' &&
      !this.trainees.some((t) => t.userId === trainee.userId)
    );
  }
}
