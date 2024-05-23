import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { IUser } from '../../interfaces/IUser';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../Services/user.service';
import { ButtonModule } from 'primeng/button';
import { DatePipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, NgClass, NgIf],
  providers: [DatePipe],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent implements OnInit {
  title: string = 'new account';
  users: IUser[] = [];
  registerForm: any = new FormGroup({
    userId: new FormControl(0),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    dateOfBirth: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    emailAddress: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      // Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{6,}$/),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      // Validators.pattern('"^[0-9]{10}$"'),
    ]),
    gender: new FormControl('', [Validators.required, Validators.minLength(3)]),
    gpa: new FormControl(0, [Validators.required, Validators.minLength(3)]),
    major: new FormControl('', [Validators.required, Validators.minLength(3)]),
    skills: new FormControl('', [Validators.minLength(3)]),
    resumeCv: new FormControl('', [Validators.minLength(3)]),
    portfolio: new FormControl('', [Validators.minLength(3)]),
    linkedInProfile: new FormControl('', [Validators.minLength(3)]),
    gitHubProfile: new FormControl('', [Validators.minLength(3)]),
    role: new FormControl('Student'),
  });
  // reactiveform: any;

  constructor(
    private userService: UserService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data; // Assign fetched users data to the 'users' property
      console.log(this.users); // Log the fetched users data
    });
    const date = new Date();
    console.log(this.datePipe.transform(date, 'yyyy-MM-dd'));
  }

  addUser() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      const transformedDateOfBirth = this.datePipe.transform(
        this.registerForm.value.dateOfBirth,
        'yyyy-MM-dd'
      );

      const userData: IUser = {
        ...formData,
        userId: 0,
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        dateOfBirth: transformedDateOfBirth,
        emailAddress: formData.emailAddress || '',
        password: formData.password || '',
        phoneNumber: formData.phoneNumber || '',
        gender: formData.gender || '',
        gpa: formData.gpa || 0,
        major: formData.major || '',
        skills: formData.skills || '',
        resumeCv: formData.resumeCv || '',
        portfolio: formData.portfolio || '',
        linkedInProfile: formData.linkedInProfile || '',
        gitHubProfile: formData.gitHubProfile || '',
        role: formData.role || 'Student',
      };
      this.userService.addUser(userData).subscribe((newUser) => {
        console.log('User added successfully', newUser);
        this.registerForm.reset();
        this.router.navigate(['login']);
      });
    }
  }
}
