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

    console.log("button 1 pressed");

    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: `Go Back`,
          },
          {
            action: 'link',
            label: 'Visit Tesla.com',
            target: 'https://www.tesla.com/inventory/new?referral=milan88648&redirect=no',
          },
        ],
        image: {
          src: `${NEXT_PUBLIC_URL}/models.png`,
          aspectRatio: '1:1',
        },
        postUrl: `${NEXT_PUBLIC_URL}`,
      }),
    );
    
  }

  if (message?.button === 2) {

    console.log("button 2 pressed");

    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: `Go Back`,
          },
          {
            action: 'link',
            label: 'Visit Tesla.com',
            target: 'https://www.tesla.com/inventory/new?referral=milan88648&redirect=no',
          },
        ],
        image: {
          src: `${NEXT_PUBLIC_URL}/model3.png`,
          aspectRatio: '1:1',
        },
        postUrl: `${NEXT_PUBLIC_URL}`,
      }),
    );
    
  }

  if (message?.button === 3) {

    console.log("button 3 pressed");

    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: `Go Back`,
          },
          {
            action: 'link',
            label: 'Visit Tesla.com',
            target: 'https://www.tesla.com/inventory/new?referral=milan88648&redirect=no',
          },
        ],
        image: {
          src: `${NEXT_PUBLIC_URL}/modelx.png`,
          aspectRatio: '1:1',
        },
        postUrl: `${NEXT_PUBLIC_URL}`,
      }),
    );
    
  }

  if (message?.button === 4) {

    console.log("button 4 pressed");

    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: `Go Back`,
          },
          {
            action: 'link',
            label: 'Visit Tesla.com',
            target: 'https://www.tesla.com/inventory/new?referral=milan88648&redirect=no',
          },
        ],
        image: {
          src: `${NEXT_PUBLIC_URL}/modely.png`,
          aspectRatio: '1:1',
        },
        postUrl: `${NEXT_PUBLIC_URL}`,
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
        src: `${NEXT_PUBLIC_URL}/home.png`,
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
