import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
          }}
        >
          <span
            style={{
              fontWeight: 'bold',
              fontSize: '3rem',
              marginTop: '1rem',
              color: 'white',
            }}
          >
            Select Option to Create your Story
          </span>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              width: '100%',
              margin: '1.5rem',
            }}
          >
            {options.map((option) => (
              <div tw='flex flex-col items-center' key={option}>
                <span tw='text-white text-2xl'>{option}</span>
              </div>
            ))}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(e);
    return new Response(e, { status: 500 });
  }
}
