import React from 'react';
import { Grid, GridItem, GridProps, GridItemProps } from '@chakra-ui/react';

export const HEADER_CONTENT_FOOTER: Pick<GridProps, 'templateAreas' | 'templateRows' | 'templateColumns'> = {
  templateAreas: `
    'header header'
    'content content'
  `,
  templateRows: '75px 1fr',
  templateColumns: 'auto'
}

const Page = React.forwardRef<HTMLDivElement, GridProps>(function Page({ ...props }, ref) {
  return (
    <Grid
      ref={ref}
      height='100vh'
      {...props }
    />
  )
});

export const Header = React.forwardRef<HTMLDivElement, GridItemProps>(function Header({ ...props }, ref) {
  return (
    <GridItem
      ref={ref}
      gridArea='header'
      display='flex'
      alignItems='center'
      color='white'
      backgroundColor='gray.700'
      paddingX='8'
      {...props }
    />
  )
});

export const Content = React.forwardRef<HTMLDivElement, GridItemProps>(function Content({ ...props }, ref) {
  return (
    <GridItem 
      ref={ref}
      gridArea='content'
      backgroundColor='gray.100'
      {...props }
    />
  )
});

export default Page;
