import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jobsData from "../data/jobs.json";
import { Job } from "../types/Job";
import { Application } from "../types/Application";

interface JobState {
  jobs: Job[];
  applications: Application[];
}

const initialState: JobState = {
  jobs: jobsData as Job[], 
  applications: [],
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    markAsApplied: (state, action: PayloadAction<number>) => {
      const jobId = action.payload;
      const job = state.jobs.find((j) => j.id === jobId);
      if (job) job.applied = true;
    },
    addApplication: (
      state,
      action: PayloadAction<{ jobId: number; formData: any }>
    ) => {
      const { jobId, formData } = action.payload;
      state.applications.push({
        jobId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        skills: formData.skills,
        aboutMe: formData.aboutMe,
        aboutMeHTML: formData.aboutMeHTML,
      });
    },
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs.push(action.payload);
    },
    deleteJob: (state, action: PayloadAction<number>) => {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
    },
  },
});

export const { markAsApplied, addApplication, addJob, deleteJob } =
  jobSlice.actions;
export default jobSlice.reducer;
