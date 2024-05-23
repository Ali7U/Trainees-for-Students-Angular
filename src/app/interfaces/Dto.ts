export interface ApplicationDto {
    applicationId: number;
    traineeCourseId: number;
    userId: number;
    status: string;
  }
  
  export interface UserDto {
    userId: number;
    firstName: string;
    lastName: string;
    linkedInProfile: string;
    gitHubProfile: string;
    portfolio: string;
    skills: string;
    applications: ApplicationDto[];
  }
  