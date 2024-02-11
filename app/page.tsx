import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

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
    src: `${NEXT_PUBLIC_URL}/modely.png`,
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
    images: [`${NEXT_PUBLIC_URL}/park-1.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default async function Page() {

  const data = await getData()

  return (
    <>
      <h1>tesla inventory frame</h1>
      <p>Number of available Model Y cars in the US: {data}</p>
    </>
  );
}

async function getData() {
  const res = await fetch('https://api.example.com/...')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 