export interface ApplicationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  skills: { label: string; value: string }[];
  aboutMe: string;
}
