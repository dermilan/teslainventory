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

  if (message?.button === 1) {

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
          src: `${NEXT_PUBLIC_URL}/api/og/ms?timestamp=${new Date().getTime()}`,
          aspectRatio: '1:1',
        },
        postUrl: `${NEXT_PUBLIC_URL}/api/home`,
      }),
    );
    
  }

  if (message?.button === 2) {

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
          src: `${NEXT_PUBLIC_URL}/api/og/m3?timestamp=${new Date().getTime()}`,
          aspectRatio: '1:1',
        },
        postUrl: `${NEXT_PUBLIC_URL}/api/home`,
      }),
    );
    
  }

  if (message?.button === 3) {

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
          src: `${NEXT_PUBLIC_URL}/api/og/mx?timestamp=${new Date().getTime()}`,
          aspectRatio: '1:1',
        },
        postUrl: `${NEXT_PUBLIC_URL}/api/home`,
      }),
    );
    
  }

  if (message?.button === 4) {

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
          src: `${NEXT_PUBLIC_URL}/api/og/my?timestamp=${new Date().getTime()}`,
          aspectRatio: '1:1',
        },
        postUrl: `${NEXT_PUBLIC_URL}/api/home`,
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
      postUrl: `${NEXT_PUBLIC_URL}/api/home`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
