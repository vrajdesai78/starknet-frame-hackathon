import OpenAI from 'openai';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');

  if (!text) {
    return new Response('Text is required', { status: 400 });
  }

  const openai = new OpenAI({
    apiKey: process.env.API_KEY,
  });

  const response = await openai.images.generate({
    model: 'dall-e-2',
    prompt: text,
    n: 1,
    size: '1024x1024',
  });

  const imageUrl = response.data[0].url;

  return new Response(imageUrl, { status: 200 });
}
