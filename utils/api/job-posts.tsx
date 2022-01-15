import { ParseJobPostResponse } from "../../types/api";

export interface ParseJobPostingArgs {
  file: File;
}

export const parseJobPosting = ({ file }: ParseJobPostingArgs): Promise<ParseJobPostResponse> => {
  return fetch('/api/parse-job-post', {
    method: 'POST',
    body: file
  }).then(
    async (response) => {
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.message ?  error?.message : response.statusText)
      }

      return response.json() 
    }
  );
};
