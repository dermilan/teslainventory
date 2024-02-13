import { ImageResponse } from "@vercel/og";
import { NEXT_PUBLIC_URL } from '../../../config';


// App router includes @vercel/og.
// No need to install it.
 
export const runtime = 'edge';


 
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
Model Y: Currently available in the US. 
      </div>
    ),
    {
      width: 1440,
      height: 900,
    },
  );
}

