import { ApplicationStatus } from "./ApplicationStatus";

export interface IApplication {
  applicationId?: number;
  traineeCourseId: number;
  userId: number;
  status: ApplicationStatus;
}
