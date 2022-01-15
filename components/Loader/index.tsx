import React from 'react';
import { Center, CenterProps, Spinner } from '@chakra-ui/react';

const Loader = React.forwardRef<HTMLDivElement, CenterProps>(({ ...props }, ref) => {
  return (
    <Center
      ref={ref}
      height={400}
      {...props }
    >
      <Spinner color='teal.400' size='xl' />
    </Center>
  );
});

export default Loader;
