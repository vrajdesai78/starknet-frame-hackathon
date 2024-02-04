import OpenAI from 'openai';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const previousStory = searchParams.get('story');

  console.log('previousStory', previousStory);

  const openai = new OpenAI({
    apiKey: process.env.API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `
    I am creating a "Build your story" where I ask user to select one option from 4 and continue this process to have a full story. This options should be small of 4-5 words. 
    Show me the options for the next step in the story based on the previous story i.e. "${previousStory}".

    return as an array in this format:
    ["option1", "option2", "option3", "option4"]
    `,
      },
    ],
  });

  return new Response(response.choices[0].message.content, {
    status: 200,
  });
}
