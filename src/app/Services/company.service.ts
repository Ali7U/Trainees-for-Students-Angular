import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ICompany } from '../interfaces/ICompany';
import { ILoginForCompany } from '../interfaces/ILoginForCompany';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../interfaces/auth-response';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  apiUrl: string = environment.apiUrl;
  private tokenKey: string = 'companyToken';

  constructor(private http: HttpClient) {}

  getAllCompanies(): Observable<ICompany[]> {
    return this.http.get<ICompany[]>(`${this.apiUrl}/Company`);
  }

  createCompany(company: ICompany): Observable<ICompany> {
    return this.http.post<ICompany>(`${this.apiUrl}/Company`, company);
  }

  loginCompany(company: ILoginForCompany): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/AuthCompanies/login`, company)
      .pipe(
        map((response) => {
          if (response) {
            localStorage.setItem(this.tokenKey, response.token);
          }
          return response;
        })
      );
  }

  getCompanyById(companyId: number):Observable<ICompany[]> {
    return this.http.get<ICompany[]>(`${this.apiUrl}/Company/${companyId}`)
  }
}
