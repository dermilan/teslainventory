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

  const data_my = await getData('my')
  const data_m3 = await getData('m3')
  const data_ms = await getData('mx')
  const data_mx = await getData('ms')


  console.log('logging from Page()')

  return (
    <>
      <h1>tesla inventory frame</h1>
      <p>fetched data my: {data_my.total_matches_found}</p>
      <p>fetched data m3: {data_m3.total_matches_found}</p>
      <p>fetched data mx: {data_mx.total_matches_found}</p>
      <p>fetched data ms: {data_ms.total_matches_found}</p>
    </>
  );
}

async function getData(model: string) {

  console.log('logging from getData()')
  const query: string = 'https://www.tesla.com/inventory/api/v4/inventory-results?query={"query":{"model":"${model}","condition":"new","options":{},"arrangeby":"Relevance","order":"desc","market":"US","language":"en","super_region":"north america"},"offset":0,"count":50,"outsideOffset":0,"outsideSearch":false,"isFalconDeliverySelectionEnabled":true,"version":"v2"}';
  //const res = await fetch(query, { next: { revalidate: 3600 } })
  const res = await fetch(query)
  
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}




