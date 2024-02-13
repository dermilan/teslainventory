import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';
  let buttonPressed: any | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

  buttonPressed = message?.button;
  console.log('button pressed is: ' + buttonPressed);

  if (message?.button === 1) {

    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: `S`,
          },
          {
            label: '3',
          },
          {
            label: `X`,
          },
          {
            label: 'Y',
          },
        ],
        image: {
          src: `${NEXT_PUBLIC_URL}/home-min.png`,
          aspectRatio: '1:1',
        },
        postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
      }),
    );
    
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `Go Back`,
        },
      ],
      image: {
        src: `${NEXT_PUBLIC_URL}/home-min.png`,
        aspectRatio: '1:1',
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
