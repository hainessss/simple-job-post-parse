# Simple Job Post Parser

Demo available at [https://simple-job-post-parse.vercel.app/](https://simple-job-post-parse.vercel.app/)

## Assumptions

- Objective of the challenge was to parse the main descriptive paragraph of a job post and any associated bullet points that detail the desired experience and job responsibilities.
- The input would always be a plain text file.
- The input would always be in the same format (more on this below).

## Design choices

- Limited the upload to only accept .txt files. This prevents the upload of an unnaccounted for file type.
- Only one job post can be parsed at a time. This reduces the scope for mvp by a decent amount. Parsing of multiple files would be a great fast follow feature.
- The parser would not have persistence. This allows us to focus on the just the parsing interface and allows the tool to be used without the creation of an account/authentication.

## Approach 

Orignally I wanted to create a solution that could take in any format of job post as an input. 

Some things I observed about about how job posts are constructed:

- The first job title on the page is always the job title that the post is for. Putting an unrelated job title in front of the title that the post is for would be poor design.
- The main descriptive paragraph of the job post often has a reference to the job title or references to related job titles (i.e. Front-end Engineer might be shortend to Engineer).

Using these two findings I thought that perhaps a Natural Language Processing library could be used.  Using this job title [dataset](https://github.com/jneidel/job-titles/blob/master/job-titles.json) to create a simple rules based custom named entity, we could identify entities that would illuminate the jop title and main descriptive paragraph.  

However, the problem I realised was that the bullet point sections often accounted for the most important information in the job post as a whole.  And those couldn't be identified without a more advanced NLP approach. In addition, plain text has so little to go off of in terms of data struture that I couldn't parse the bullets based on any common formatting.  

Because of these limitations I decide to just optimize for the format of the sample job post that was provided. Which has the format of:

```
${section title}: ${section text}

${section title}: ${section text}
```

With this assumption, I could greedily iterate through each line of job post and use regex to identify when new sections start and end.

## Tech Stack

- **Web framework** - Next.js - A simple way to create react applications optimized by server-side rendering. 
- **UI components** - Chakra UI - I always start my projects with a common ui library to increase velocity, consitency, and accessibility.  Chakra's approach is similar to the approach I took to build my last component library. I like the pattern of creating react components instead of css files and classes.
- **Client-side Fetching and Caching** - react-query - React Query provides a standardized way to implement the fetching of data in react.  In addition, it caches queries so it can provide users with cached data while the application rehydrates the data in the background. This leads to faster render times.
- **Routing** - none - Because there are only two views in the application, I decided no router was needed in order to keep things as simple as possible. If I added a database to the backend I would add routing in order to access specific posts.
- **Global State Management** - none - Due to how shallow/simple the component tree of the application is at its current state; local state was more than sufficient.
- **Backend** - Next.js lambda - Next.js has simple lambda based api layer built into the deployment. Only having one endpoint with no external dependcies is a great use case for lambdas. I added express to take advantage of its middleware ecosystem, though I ended up not using any.  

## Improvements

- **Database Persistance** - This would allow parsed posts to be saved and refrenced in the future. A NoSql database would probably be a good choice here.
- **Multiple Upload** - Parsing multiple posts at once for convienence.
- **Testing** - The parsing function could use a lot of edge case unit testing.
- **Multiple Formats** - Parse different types of job post formats.

