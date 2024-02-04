import OpenAI from 'openai';

export async function GET(request: Request) {
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

    return as an array in this format only 4 options are allowed:
    ["option1", "option2", "option3", "option4"]
    `,
      },
    ],
    n: 1,
  });

  if (response?.choices[0]?.message?.content) {
    const dataArray: string[] = JSON.parse(
      response?.choices[0]?.message?.content.toString()
    );
    return Response.json({
      options: dataArray,
    });
  } else {
    return new Response('Error', { status: 500 });
  }
}
