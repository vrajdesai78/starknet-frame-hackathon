import OpenAI from 'openai';

export async function GET(request: Request) {
  const openai = new OpenAI({
    apiKey: process.env.API_KEY,
  });

  const response = await openai.images.generate({
    model: 'dall-e-2',
    prompt: 'A painting of a rose',
    n: 1,
    size: '1024x1024',
  });

  const imageUrl = response.data[0].url;

  return new Response(imageUrl, { status: 200 });
}
