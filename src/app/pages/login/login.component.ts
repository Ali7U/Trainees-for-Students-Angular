import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { Login } from '../../interfaces/Login';
import { IUser } from '../../interfaces/IUser';
// import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

// Hilal123
export class LoginComponent implements OnInit {
  errorMsg: string = '';
  userForm!: FormGroup;
  student: IUser[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      loginPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        // Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{6,}$/),
      ]),
    });
    
  }

  async onSubmit() {
    try {
      if (this.userForm.valid) {
        console.log('this.userForm.valu', this.userForm.value);
        this.userService.userLogin(this.userForm.value).subscribe({
          next: (res: any) => {
            console.log(res);
            localStorage.setItem('Token', res.token);
            this.userForm.reset();
            this.router.navigate(['main']);
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
  }
}
