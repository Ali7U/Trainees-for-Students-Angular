import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ICompany } from '../../interfaces/ICompany';
import { CompanyService } from '../../Services/company.service';
import { Router } from '@angular/router';
import * as bcrypt from 'bcrypt';

@Component({
  selector: 'app-register-for-company',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, NgClass, NgIf],
  templateUrl: './register-for-company.component.html',
  styleUrl: './register-for-company.component.css',
})
export class RegisterForCompanyComponent implements OnInit {
  title: string = 'new account';
  companies!: ICompany[];
  msg: string = '';
  registerForm = new FormGroup({
    companyId: new FormControl(0),
    companyName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    companyLogo: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    aboutCompany: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    industry: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    location: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    contactInformation: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  constructor(private companyService: CompanyService, private router: Router) {}

  ngOnInit(): void {
    this.companyService.getAllCompanies().subscribe((data) => {
      this.companies = data;
      console.log(this.companies);
    });
  }

  addCompany() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      // const saltt = bcrypt.genSaltSync();
      // bcrypt.hashSync(this.salt, saltt);
      // const hashPassword = bcrypt.hashSync(formData.password, 10)

      const companyData: ICompany = {
        ...formData,
        companyId: 0,
        companyName: formData.companyName || '',
        companyLogo: formData.companyLogo || '',
        aboutCompany: formData.aboutCompany || '',
        industry: formData.industry || '',
        description: formData.description || '',
        location: formData.location || '',
        contactInformation: formData.contactInformation || '',
        password: formData.password || '',
        traineecourses: [],
      };

      this.companyService.createCompany(companyData).subscribe((newCompany) => {
        console.log('Company added successfully', newCompany);
        this.router.navigate(['login-for-company']);
        this.registerForm.reset();
      });
    }
  }
}
