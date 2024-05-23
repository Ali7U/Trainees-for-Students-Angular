import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedIdService {
  // private traineeCourseIdSource = new BehaviorSubject<number | null>(null);
  // currentTraineeCourseId = this.traineeCourseIdSource.asObservable();
  traineeId!: number;
  constructor() {}

  // Method to change the ID
  // changeTraineeCourseId(id: number) {
  //   this.traineeCourseIdSource.next(id);
  // }

  // // Method to get the current ID value
  // getCurrentTraineeCourseId() {
  //   return this.traineeCourseIdSource.value;
  // }

  setTraineeId(id: number) {
    this.traineeId = id;
  }

  getTraineeId() {
    return this.traineeId;
  }
}
