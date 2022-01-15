import { useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Heading, Container } from '@chakra-ui/react'

import Page, { Header, Content, HEADER_CONTENT_FOOTER } from '../components/Page'
import JobPostUpload from '../components/JobPostParser'
import { ParseJobPostResponse } from '../types/api'
import JobPost from '../components/JobPost'

const Home: NextPage = () => {
  const [parsedPost, setParsedPost] = useState<ParseJobPostResponse>();

  return (
    <Page {...HEADER_CONTENT_FOOTER}>
      <Head>
        <title>Job Posting Parser</title>
        <meta name="description" content="Utility for parsing job postings from plain text." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <Heading as='h1'>
          Job Posting Parser
        </Heading>
      </Header>
      <Content>
        <Container maxW='container.md' paddingY={8}>
          {
            parsedPost
              ? <JobPost post={parsedPost} onBack={() => setParsedPost(undefined)} />
              : <JobPostUpload onJobPostParsed={(response) => setParsedPost(response)} />
          }
        </Container>
      </Content>
    </Page>
  )
}

export default Home
