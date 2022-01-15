import React, { useMemo } from 'react';
import { Box, BoxProps, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { useClipboard } from '@chakra-ui/react'

import { JobPostSectionTitle, ParseJobPostResponse } from '../../types/api';
import { CopyIcon } from '@chakra-ui/icons';

export interface JobPostProps {
  post: ParseJobPostResponse;
  onBack: () => void;
};

export const JOB_POST_SECTIONS_TO_RENDER: JobPostSectionTitle[] = [
  JobPostSectionTitle['JOB_TITLE'],
  JobPostSectionTitle['JOB_DESCRIPTION']
];

const jobTitleStyles: BoxProps = {
  fontSize: 40,
  lineHeight: 1,
  fontWeight: 'light'
};


const JobPost = ({ post = [], onBack }: JobPostProps) => {
  const sectionsToRender = useMemo(() => {
    return post.filter((section) => {
      return JOB_POST_SECTIONS_TO_RENDER.includes(section.label)
    });
  }, [post])

  return (
    <>
      <Box marginBottom='4'>
        <Text
          onClick={() => {
            onBack?.();
          }}
          role='button'
          color='teal.400'
          fontWeight='bold'
          _hover={{
            textDecoration: 'underline'
          }}
          fontSize={18}
        >
          Back
        </Text>
      </Box>
      {
        sectionsToRender.map((section) => {
          return (
            <Box key={section.label} paddingY='4'>
              <Heading marginBottom='2' size='md' color='gray.500'>
                {section.label}
              </Heading>
              {
                section.text.map((text) => {
                  return (
                    <Text
                      className={section.label === JobPostSectionTitle['JOB_TITLE'] ? 'job-title' : ''}
                      sx={{
                        '&.job-title': {
                          ...jobTitleStyles
                        }
                      }}
                      fontSize={18}
                      marginBottom='4'
                    >
                      {text}
                    </Text>
                  )
                })
              }
            </Box>
          )
        })
      }
    </>
  );
};

export default JobPost;