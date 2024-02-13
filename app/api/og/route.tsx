import { ImageResponse } from "@vercel/og";
import { NEXT_PUBLIC_URL } from '../../config';

// App router includes @vercel/og.
// No need to install it.
 
export const runtime = 'edge';

const data_my = await getData('my');

const matches = data_my.total_matches_found;
 
export async function GET() {
  return new ImageResponse(
    (
      
      <div
        
      style={{
        fontSize: 60,
        fontWeight: 700,
        letterSpacing: -2,
        backgroundImage: `url('${NEXT_PUBLIC_URL}/home-min.png')`,
        color: 'yellow',
        width: '100%',
        height: '100%',
        padding: '50px 200px',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'flex-end',
        }}
      >
Model Y: Currently {matches} available in the US. 
      </div>
    ),
    {
      width: 1440,
      height: 900,
    },
  );
}

async function getData(model: string) {

  console.log('logging from getData()')
  const query: string = `https://www.tesla.com/inventory/api/v4/inventory-results?query={"query":{"model":"${model}","condition":"new","options":{},"arrangeby":"Relevance","order":"desc","market":"US","language":"en","super_region":"north america"},"offset":0,"count":50,"outsideOffset":0,"outsideSearch":false,"isFalconDeliverySelectionEnabled":true,"version":"v2"}`;
  const res = await fetch(query, { next: { revalidate: 3600 } })
  //const res = await fetch(query)
  
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}