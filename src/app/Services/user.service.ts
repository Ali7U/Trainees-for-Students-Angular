import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { Observable, forkJoin } from 'rxjs';
import { Login } from '../interfaces/Login';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}/User`);
  }

  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/User`, user);
  }

  userLogin(login: Login): Observable<Login> {
    return this.http.post<Login>(`${this.apiUrl}/Auth/login`, login);
  }

  getUserById(userId: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/User/${userId}`);
  }

  getUsersByIds(userIds: number[]): Observable<IUser[]> {
    const requests: Observable<IUser>[] = userIds.map((id) =>
      this.getUserById(id)
    );
    return forkJoin(requests);
  }
}
