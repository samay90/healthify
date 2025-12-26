const OpenAI = require('openai');
require('dotenv').config();
const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENAI_API_KEY,
});



module.exports = client;