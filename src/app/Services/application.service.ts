import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IApplication } from '../interfaces/IApplication';
import { environment } from '../../environments/environment';
import { ApplicationStatus } from '../interfaces/ApplicationStatus';
import { UserDto } from '../interfaces/Dto';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  apiUrl: string = environment.apiUrl;


  constructor(private http: HttpClient) {}

  getApplications(): Observable<IApplication[]> {
    return this.http.get<IApplication[]>(`${this.apiUrl}/Application`);
  }

  createApplication(application: IApplication): Observable<IApplication> {
    return this.http.post<IApplication>(
      `${this.apiUrl}/Application`,
      application
    );
  }

  // sendApplications(applications: IApplication[]) {
  //   this.applicationsSource.next(applications);
  // }

  updateApplicationStatus(
    applicationId: number,
    status: IApplication
  ): Observable<IApplication> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<IApplication>(
      `${this.apiUrl}/application/${applicationId}`,
      status,
      { headers: headers }
    );
  }

  getApplicationByTraineeId(traineeCourseId: number):Observable<UserDto[]>{
    return this.http.get<UserDto[]>(`${this.apiUrl}/Application/TraineeCourse/${traineeCourseId}`)
  }
}
