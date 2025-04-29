export interface Application {
  jobId: number;
  firstName: string;
  lastName: string;
  email: string;
  skills: { label: string; value: string }[];
  aboutMe: string;
  aboutMeHTML?: string;
}
