import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';
import { fetchTeslaInventory } from './utils/fetchTeslaInventory';


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

export default function Page({modelYInventory}) {
  return (
    <>
      <h1>tesla inventory frame</h1>
      <p>Number of available Model Y cars in the US: {modelYInventory}</p>
    </>
  );
}

export const getServerSideProps = async () => {
  const data = await fetchTeslaInventory();
  const modelYInventory = data ? data.inventory.modelY.us.available : 0;
  
  return {
    props: {
      modelYInventory,
    },
  };
};