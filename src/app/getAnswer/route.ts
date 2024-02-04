import { getSSLHubRpcClient, Message } from '@farcaster/hub-nodejs';

const HUB_URL = 'nemes.farcaster.xyz:2283';
const client = getSSLHubRpcClient(HUB_URL);

export async function POST(request: Request) {
  const body = await request.json();

  let validatedMessage: Message | undefined;

  try {
    const frameMessage = Message.decode(
      Buffer.from(body?.trustedData?.messageBytes || '', 'hex')
    );
    const result = await client.validateMessage(frameMessage);
    if (result.isOk() && result.value.valid) {
      validatedMessage = result.value.message;
    }

    // Also validate the frame url matches the expected url
    let urlBuffer = validatedMessage?.data?.frameActionBody?.url || [];
    const urlString = Buffer.from(urlBuffer).toString('utf-8');
    if (!urlString.startsWith(process.env.HOST_URL || '')) {
      return new Response('Invalid frame url', { status: 400 });
    }
  } catch (e: any) {
    return new Response(e, { status: 500 });
  }

  const buttonId = validatedMessage?.data?.frameActionBody?.buttonIndex || 0;

  const imageUrl = `${process.env.HOST_URL}/result?answer=${buttonId}`;
  return new Response(
    `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Result</title>
                <meta property="og:title" content="Result" />
                <meta property="og:image" content="${imageUrl}" />
                <meta name="fc:frame" content="vNext">
                <meta name="fc:frame:image" content="${imageUrl}">
                <meta name="fc:frame:post_url" content="${process.env.HOST_URL}/start">
                <meta name="fc:frame:button:1" content="Continue your Story">
                <meta name="fc:frame:button:2" content="Mint this as NFT">
            </head>
        <body>
        <p> Let's start creating a story </p>
        </body>
        </html>
    `,
    {
      headers: {
        'Content-Type': 'text/html',
      },
      status: 200,
    }
  );
}