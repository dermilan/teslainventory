import { ImageResponse } from "@vercel/og";
import { NEXT_PUBLIC_URL } from '../../../config';
import { kv } from '@vercel/kv';

// App router includes @vercel/og.
// No need to install it.
 
export const runtime = 'edge';

export async function GET() {

  const res = await fetch(NEXT_PUBLIC_URL);
  const tdata = await res.json();

  let data = await kv.get('my');
  let lastFetchTimestamp:number | null = await kv.get('lastUpdate');
  let timeStamp = '';

  if (lastFetchTimestamp !== null) {
    timeStamp = new Date(lastFetchTimestamp).toLocaleString();
    console.log(timeStamp);
  } else {
    console.log("Unable to fetch last update timestamp.");
  }



  const str: string = `${data}`;

  const fontData = await fetch(
    new URL('../../../../public/ProtoMonoRegular.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      

      <div
      style={{
        display: 'flex',
        backgroundImage: `url('${NEXT_PUBLIC_URL}/modely-min.png')`,
        width: '100%',
        height: '100%',
        padding: '50px 200px',
      }}
      >

      <div
        
      style={{
        fontSize: 60,
        fontWeight: 200,
        letterSpacing: -2,
        color: 'yellow',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'flex-end',
        }}
      >
      {`Model Y: Currently ${str} available in the US.`}
      </div>

      <div
            style={{
              fontSize: 20,
              fontWeight: 200,
              letterSpacing: -2,
              color: 'yellow',
              textAlign: 'right',
              position: 'absolute', // Add position absolute
              top: 10, // Position at the bottom
              right: 280, // Position at the right

              }}
      >
      {`Data fetched: ${timeStamp}`}
      </div>


      </div>
    ),
    {
      width: 1440,
      height: 900,
      fonts: [
        {
          name: 'Proto',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  );
}

