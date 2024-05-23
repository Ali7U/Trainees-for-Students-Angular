import { Component, OnInit } from '@angular/core';
import { TraineeCourseService } from '../../Services/trainee-course.service';
import { Router, RouterLink } from '@angular/router';
import { ITraineeCourse } from '../../interfaces/ITraineeCourse';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-add-trainee',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './add-trainee.component.html',
  styleUrl: './add-trainee.component.css',
})
export class AddTraineeComponent implements OnInit {
  trainees: ITraineeCourse[] = [];
  traineeForm!: FormGroup;
  msg: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private traineeCourseService: TraineeCourseService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // this.traineeCourseService.getAllTrainees().subscribe((res) => {
    //   this.trainees = res;
    //   console.log(this.trainees);
    // });

    this.traineeForm = this.formBuilder.group({
      companyId: [0, Validators.required],
      traineeCourseId: [0, Validators.required],
      traineeTitle: ['', Validators.required],
      traineeDescription: ['', Validators.required],
      expectationsFromStudents: ['', Validators.required],
      gparequirement: [0, Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      maxUsers: [0, Validators.required],
    });
  }

  onSubmit() {
    const companyId = this.getCompanyIdFromToken();
    if (this.traineeForm.valid) {
      const formData = this.traineeForm.value;
      console.log(this.traineeForm.value);
      const data: ITraineeCourse = {
        ...formData,
        companyId: companyId,
        traineeTitle: formData.traineeTitle,
        traineeDescription: formData.traineeDescription,
        expectationsFromStudents: formData.expectationsFromStudents,
        gparequirement: formData.gparequirement,
        maxUsers: formData.maxUsers,
        startDate: formData.startDate,
        endDate: formData.endDate,
        applications: formData.applications,
      };

      this.traineeCourseService.addTrainee(data).subscribe((trainee) => {
        console.log('Trainee added successfully', trainee);
        this.traineeForm.reset();
        this.router.navigate(['company-dashboard']);
      });
    }
  }

  private getCompanyIdFromToken(): number | null {
    const token = localStorage.getItem('companyToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);

      return Number(decodedToken.CompanyId);
    }
    return null;
  }
}
