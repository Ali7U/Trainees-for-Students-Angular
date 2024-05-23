import { IApplication } from "./IApplication";

export interface IUser {
  userId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  emailAddress: string;
  password: string;
  gender: string;
  phoneNumber: string;
  gpa: number;
  major: string;
  skills: string;
  resumeCv: string;
  portfolio: string;
  linkedInProfile: string;
  gitHubProfile: string;
  role: string;
  application: IApplication[]
}
