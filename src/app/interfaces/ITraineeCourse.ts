import { IApplication } from './IApplication';

export interface ITraineeCourse {
  traineeCourseId: number;
  companyId: number;
  traineeTitle: string;
  traineeDescription: string;
  expectationsFromStudents: string;
  gparequirement: number;
  startDate: string;
  endDate: string;
  maxUsers: number;
  applications: IApplication[];
}
