import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CompanyService } from '../../Services/company.service';
// const bcrypt = require('bcrypt');


@Component({
  selector: 'app-login-for-company',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './login-for-company.component.html',
  styleUrl: './login-for-company.component.css',
})
export class LoginForCompanyComponent implements OnInit {
  authService = inject(CompanyService);
  errorMsg: string = '';
  companyForm!: FormGroup;
  salt: string = 'aaca';

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.companyForm = this.formBuilder.group({
      companyName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
    });
    
    
    // return CryptoJS
  }

  async onSubmit() {
    try {
      if (this.companyForm.valid) {
        console.log('this.companyForm.value', this.companyForm.value);
        this.authService.loginCompany(this.companyForm.value).subscribe({
          next: (res) => {
            console.log(res);
            this.companyForm.reset();
            this.router.navigate(['company-dashboard']);
          },
          error: (err) => {
            this.errorMsg = 'something when wrong';
            console.log(err);
          },
        });
      }
    } catch (error) {
      console.error('Login field:', error);
      this.errorMsg = 'Invalid email address or password';
    }

    // this.authService.loginCompany(this.companyForm.value).subscribe((res) => {
    //   console.log(res);
    //   this.router.navigate(['company-dashboard']);
    // });
  }
}
