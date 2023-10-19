import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { createLanguageModel, createJsonTranslator } from 'typechat';

import { FilterResponse } from '@/types/filters';

// Don't forget to set the OPENAI_API_KEY and OPENAI_MODEL environment variables!
// Email tim@mydeliverable.com if you need help getting an API key
const model = createLanguageModel(process.env);
const schema = fs.readFileSync('./types/filters.ts', 'utf-8');
const translator = createJsonTranslator<FilterResponse>(model, schema, 'FilterResponse');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Implement me!
  const { query } = req.query;
  if (!query) {
    return res.status(200).send(JSON.stringify({}));
  }
  const response = await translator.translate(query as string);
  if (!response.success) {
    return res.status(500).json({ error: response.message });
  }

  const filter = response.data;
  return res.status(200).send(JSON.stringify(filter));
}
