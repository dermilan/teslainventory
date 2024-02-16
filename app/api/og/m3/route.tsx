import { ImageResponse } from "@vercel/og";
import { NEXT_PUBLIC_URL } from '../../../config';
import { kv } from '@vercel/kv';

// App router includes @vercel/og.
// No need to install it.
 
export const runtime = 'edge';

export async function GET() {


  let data = await kv.get('m3');
  const str: string = `${data}`;

  const fontData = await fetch(
    new URL('../../../../public/ProtoMonoRegular.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      
      <div
        
      style={{
        fontSize: 40,
        fontWeight: 700,
        letterSpacing: -2,
        backgroundImage: `url('${NEXT_PUBLIC_URL}/model3-min.png')`,
        color: 'yellow',
        width: '100%',
        height: '100%',
        padding: '50px 200px',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'flex-end',
        }}
      >
      {`Model 3: Currently ${str} available in the US.`}
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

