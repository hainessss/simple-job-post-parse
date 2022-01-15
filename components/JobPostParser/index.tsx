import React, { useState } from 'react';
import { Box, Button, useToast } from '@chakra-ui/react';
import { useMutation } from 'react-query';

import FileCard from '../FileCard';
import UploadArea, { OnUpload } from '../UploadArea';
import { parseJobPosting, ParseJobPostingArgs } from '../../utils/api/job-posts';
import Loader from '../Loader';
import { ErrorResponse, ParseJobPostResponse } from '../../types/api';

export interface JobPostUploadProps {
  onJobPostParsed: (response: ParseJobPostResponse) => void;
};

const JobPostUpload = ({ onJobPostParsed }: JobPostUploadProps) => {
  const [postings, setPostings] = useState<File[]>([]);
  const toast = useToast()

  const handleUpload: OnUpload  = (files) => {
    setPostings(files);
  };

  const parseJob = useMutation<
    ParseJobPostResponse,
    ErrorResponse,
    ParseJobPostingArgs
  >(parseJobPosting, {
    onSuccess: async (data) => {
      onJobPostParsed(data);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }
  });

  const onSubmit = () => {
    if (postings.length) {
      parseJob.mutate({ file: postings[0] });
    }
  };

  if (parseJob.isLoading) {
    return <Loader />
  }

  return (
    <>
      <UploadArea onUpload={handleUpload} multiple={false} accept='.txt' />
      <Box paddingY={8}>
        {
          postings.map(posting => {
            return (
              <FileCard
                key={posting.name}
                name={posting.name}
                onRemove={() => setPostings([])}
                justify='space-between'
              />
            )
          })
        }
      </Box>
      <Button
        onClick={onSubmit}
        isDisabled={postings.length === 0}
        color='white'
        bg='teal.400'
        fontSize='xl'
        paddingY='8'
        isFullWidth
        _hover={{
          bg: 'teal.500'
        }}
        _active={{
          bg: 'teal.600'
        }}
      >
        Parse Job Posting
      </Button>
    </>
  );
};

export default JobPostUpload;