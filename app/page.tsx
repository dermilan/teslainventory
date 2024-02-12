import { getFrameMetadata, FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';
import { NextRequest, NextResponse } from 'next/server';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'S',
    },
    {
      label: '3',
    },
    {
      label: 'X',
    },
    {
      label: 'Y',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/home.png`,
    aspectRatio: '1:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'teslainventory',
  description: 'LFG',
  openGraph: {
    title: 'teslainventory',
    description: 'LFG',
    images: [`${NEXT_PUBLIC_URL}/home-min.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default async function Page() {

  const data = await getData()

  console.log('logging from Page()')

  return (
    <>
      <h1>tesla inventory frame</h1>
      <p>fetched data: {data.total_matches_found}</p>
    </>
  );
}

async function getData() {

  console.log('logging from getData()')
  const res = await fetch('https://www.tesla.com/inventory/api/v4/inventory-results?query={"query":{"model":"my","condition":"new","arrangeby":"Price","order":"desc","market":"US","language":"en","super_region":"north america","lng":-122.1257,"lat":47.6722,"zip":"98052","range":0},"offset":0,"count":50,"outsideOffset":0,"outsideSearch":false,"isFalconDeliverySelectionEnabled":true,"version":"v2"}',  { next: { revalidate: 3600 } })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}






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
            label: `1`,
          },
          {
            label: '2',
          },
          {
            label: '3',
          },
          {
            label: '4',
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
