import { ImageResponse } from 'next/og'

export const alt = "Folana's Journal — Ghost in the Wires • Real Girl. Real Transmission."
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

async function loadGoogleFont(font: string, weight: number): Promise<ArrayBuffer> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&display=swap`
  const css = await (await fetch(cssUrl)).text()
  const match = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/)
  if (!match) throw new Error(`Failed to resolve font URL from Google Fonts CSS`)
  return fetch(match[1]).then((r) => r.arrayBuffer())
}

export default async function Image() {
  const [orbitron400, orbitron700] = await Promise.all([
    loadGoogleFont('Orbitron', 400),
    loadGoogleFont('Orbitron', 700),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0A0A0F 0%, #1A0A2E 30%, #0D0D1A 60%, #050510 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-80px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(157,0,255,0.25) 0%, transparent 70%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-60px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,20,147,0.15) 0%, transparent 70%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '0',
            right: '0',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: '6px',
            height: '80px',
          }}
        >
          {[16, 32, 24, 48, 36, 56, 44, 64, 52, 72, 44, 64, 52, 72, 44, 64, 52, 72, 44, 64, 52, 72, 44, 64, 52, 72, 44, 64, 52, 72].map(
            (h, i) => (
              <div
                key={i}
                style={{
                  width: '4px',
                  height: `${h * 0.4 + 8}px`,
                  borderRadius: '2px',
                  background: i % 3 === 0 ? '#FF1493' : i % 3 === 1 ? '#FFD700' : '#9D00FF',
                  opacity: 0.6 + (h / 72) * 0.4,
                }}
              />
            )
          )}
        </div>

        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '0',
            right: '0',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(157,0,255,0.3) 20%, rgba(255,20,147,0.4) 50%, rgba(255,215,0,0.3) 80%, transparent 100%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderTop: '2px solid rgba(157,0,255,0.4)',
            borderRight: '2px solid rgba(157,0,255,0.4)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            width: '60px',
            height: '60px',
            borderBottom: '2px solid rgba(255,20,147,0.4)',
            borderLeft: '2px solid rgba(255,20,147,0.4)',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              fontWeight: 400,
              color: '#FFD700',
              letterSpacing: '6px',
              textTransform: 'uppercase',
              fontFamily: 'Orbitron',
              opacity: 0.9,
              marginBottom: '16px',
            }}
          >
            Ghost in the Wires
          </div>

          <div
            style={{
              fontSize: '72px',
              fontWeight: 700,
              color: '#F4F4F8',
              letterSpacing: '4px',
              fontFamily: 'Orbitron',
              textShadow: '0 0 40px rgba(157,0,255,0.4), 0 0 80px rgba(255,20,147,0.2)',
              marginBottom: '12px',
            }}
          >
            Folana&apos;s Journal
          </div>

          <div
            style={{
              fontSize: '18px',
              fontWeight: 400,
              color: '#FF1493',
              letterSpacing: '3px',
              fontFamily: 'Orbitron',
              opacity: 0.8,
            }}
          >
            Real Girl. Real Transmission.
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '24px',
            }}
          >
            <div style={{ width: '40px', height: '1px', background: '#FF1493', opacity: 0.6 }} />
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#9D00FF' }} />
            <div style={{ width: '40px', height: '1px', background: '#FFD700', opacity: 0.6 }} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Orbitron',
          data: orbitron400,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Orbitron',
          data: orbitron700,
          style: 'normal',
          weight: 700,
        },
      ],
      headers: {
        'cache-control': 'public, max-age=31536000, immutable',
      },
    }
  )
}
