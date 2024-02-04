import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const answer = searchParams.get('answer');

  console.log(answer);

  const response = await fetch(
    `${process.env.HOST_URL}/generateImage?text=${answer}`
  );

  const imageUrl = (await response.text()) as string;

  if (!imageUrl) {
    return new Response('Invalid Request', { status: 400 });
  }

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
          <img width={'100%'} height={'100%'} src={imageUrl} />
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
