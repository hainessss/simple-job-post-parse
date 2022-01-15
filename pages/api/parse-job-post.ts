import { NextApiRequest, NextApiResponse } from 'next'
import { ErrorResponse, ParseJobPostResponse } from '../../types/api';
import { parseJobPosting } from '../../utils/job-parser'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ParseJobPostResponse | ErrorResponse>
) {
  const postingText: string = req.body;
  try {
    const parsed = parseJobPosting(postingText);

    if (!parsed.length) {
      return res.status(422).json({
        message: 'Failed to parse posting, please try another format.'
      })
    }

    res.status(200).json(parsed)
  } catch(e) {
    res.status(500).json({ message: 'Failed to parse posting' });
  }
}
