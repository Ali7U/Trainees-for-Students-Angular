import { IApplication } from './IApplication';
import { ITraineeCourse } from './ITraineeCourse';
export interface ICompany {
  companyId: number;
  companyName: string;
  companyLogo: string;
  aboutCompany: string;
  industry: string;
  description: string;
  location: string;
  contactInformation: string;
  password: string;
  traineecourses: ITraineeCourse[];
  // applications: IApplication[];
}
