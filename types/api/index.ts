export enum JobPostSectionTitle {
  'JOB_TITLE' = 'Job Title',
  'JOB_LOCATION' = 'Job Location',
  'COMPANY_NAME' = 'Company Name',
  'JOB_DESCRIPTION' = 'Job Description',
  'HIRING_MANAGER' = 'Hiring Manager',
  'MIN_COMP' = 'Min Comp',
  'MAX_COMP' = 'Max Comp',
  'POSTED_DATE' = 'Posted Date',
  'ABOUT' = 'About',
  'JOB_CATEGORY' = 'Job Category',
  'RECRUITERS' = 'Recruiters',
  'SKILLS' = 'Skills',
  'QUALIFICATIONS' = 'Qualifications',
};

export interface JobPostSection {
  label: JobPostSectionTitle;
  text: string[];
};

export type ParseJobPostResponse = JobPostSection[];

export interface ErrorResponse {
  message: string;
};
