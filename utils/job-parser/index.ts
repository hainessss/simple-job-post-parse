import { JobPostSectionTitle, ParseJobPostResponse } from "../../types/api";

export type FoundSectionLabel = JobPostSectionTitle | undefined;

export const findSectionLabel = (section: string): FoundSectionLabel => {
  /** Match any number of capitalized words ending in a colon and grab first match */
  return section.match(/(([A-Z]\w*\s?)*):/)?.[1] as FoundSectionLabel;
};

export const parseJobPosting = (text: string): ParseJobPostResponse => {
  // split by line break
  const sections = text.split(/\n/);

  // store final output
  const parsedSections = [];

  let currentSectionLabel: JobPostSectionTitle | undefined = undefined;
  let currentSectionText: string[] = [];

  sections.forEach((section) => {
    // ignore if blank line
    if (section === '') {
      return;
    }
    
    // get section label
    const sectionLabel = findSectionLabel(section);
    
    // store label if present
    if (sectionLabel) {
      // if a label was previously present add to parsed and reset
      if (currentSectionLabel) {
        parsedSections.push({
          label: currentSectionLabel,
          text: currentSectionText
        });
  
        currentSectionText = [];
      }
  
      currentSectionLabel = sectionLabel;
      
      // grab any text after label
      const remainingText = section.split(/(:)/).slice(2).join('').trim();
      if (remainingText) {
        currentSectionText.push(remainingText);
      }
    } else {
      currentSectionText.push(section);
    }
  });  

  // push final parsed section
  if (currentSectionLabel) {
    parsedSections.push({
      label: currentSectionLabel,
      text: currentSectionText
    })
  }

  return parsedSections;
};
