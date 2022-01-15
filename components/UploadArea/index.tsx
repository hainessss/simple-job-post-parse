import React, { useCallback } from 'react'
import { useDropzone, DropzoneOptions, FileRejection, DropEvent } from 'react-dropzone'
import { Box, Text } from '@chakra-ui/react'

export interface OnUpload {
  (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent): void;
}

export interface UploadAreaProps {
  /** Callback when file is dropped to upload. */
  onUpload: OnUpload;
}

export default function UploadArea({ onUpload, ...props }: UploadAreaProps & DropzoneOptions) {
  const handleOnDrop = useCallback<OnUpload>((...args) => {
    onUpload(...args);
    // Do something with the files
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop: handleOnDrop,
    ...props
  })

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      backgroundColor='gray.200'
      borderStyle='dashed'
      borderWidth={4}
      borderRadius={4}
      borderColor='gray.500'
      cursor='pointer'
      height={350}
      paddingX={4}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {
        isDragActive ?
          <Text>Drop the Job Posting here ...</Text> :
          <Text>Drag a Job Posting .Txt file here, or click to select file</Text>
      }
    </Box>
  )
}