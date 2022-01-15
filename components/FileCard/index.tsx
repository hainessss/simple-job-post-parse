import React from 'react';
import { Flex, FlexProps, IconButton, Text, Box } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { TxtFileIcon } from '../Icons';

export interface FileCardProps extends FlexProps {
  /** Name of file */
  name: string;
  /** Callback called when X is clicked */
  onRemove: (name: string) => void;
}

const FileCard = React.forwardRef<HTMLDivElement, FileCardProps>(function FileCard({ name, onRemove, ...props }, ref) {
  return (
    <Flex
      ref={ref}
      borderRadius={4}
      backgroundColor='white'
      boxShadow='0px 2px 16px 0px rgba(0, 0, 0, 0.16)'
      padding='2'
      alignItems='center'
      {...props }
    >
      <Flex align='center'>
        <Box
          bg='gray.200'
          padding='2'
          borderRadius={4}
          marginRight='4'
        >
          <TxtFileIcon fontSize='40px' />
        </Box>
        <Text
          fontSize={18}
          color='gray.600'
        >
          {name}
        </Text>
      </Flex>
      <IconButton
        onClick={() => onRemove?.(name)}
        icon={<CloseIcon />}
        aria-label='remove file'
        bg='gray.200'
        _hover={{
          bg: 'gray.300'
        }}
        _active={{
          bg: 'gray.400'
        }}
      />
    </Flex>
  );
});

export default FileCard;
