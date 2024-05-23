import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITraineeCourse } from '../interfaces/ITraineeCourse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TraineeCourseService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllTrainees(): Observable<ITraineeCourse[]> {
    return this.http.get<ITraineeCourse[]>(`${this.apiUrl}/TraineeCourse`);
  }

  addTrainee(trainee: ITraineeCourse): Observable<ITraineeCourse[]> {
    return this.http.post<ITraineeCourse[]>(
      `${this.apiUrl}/TraineeCourse`,
      trainee
    );
  }

  getAllTraineesById(traineeCourseId: number): Observable<ITraineeCourse[]> {
    return this.http.get<ITraineeCourse[]>(
      `${this.apiUrl}/TraineeCourse/${traineeCourseId}`
    );
  }
}
