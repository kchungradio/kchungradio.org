'use client'

import { useState, useEffect } from 'react'
import useSWR from 'swr'

const fetcherWithApiKey = (url) =>
  fetch(url, {
    headers: { 'x-api-key': 'pk_2b3e0601b08845bd895ef1f5c8c19452' }
  }).then(res => res.json())

const PUBLIC_STUDIO_ID = '09d795c5-2b49-4084-98d9-46fbb07cc4b3'
const CHINATOWN_STUDIO_ID = 'd12662d4-4a3f-4c3e-8c8e-9b3d4b06cc81'

function ArtistList({ artistIds }) {
  const [artists, setArtists] = useState([])

  useEffect(() => {
    if (!artistIds || artistIds.length === 0) {
      setArtists([])
      return
    }
    const filteredIds = artistIds.filter(
      id => id !== PUBLIC_STUDIO_ID && id !== CHINATOWN_STUDIO_ID
    )
    if (filteredIds.length === 0) {
      setArtists([])
      return
    }
    Promise.all(
      filteredIds.map(id =>
        fetcherWithApiKey(`https://api.radiocult.fm/api/station/kchung-radio-01e54a81/artists/${id}`)
          .then(data => ({ ...data.artist, id }))
          .catch(() => null)
      )
    ).then(results => setArtists(results.filter(Boolean)))
  }, [artistIds])

  if (!artists.length) return null
  
  return (
    <div style={{ marginTop: 16 }}>
      <p>with</p>
      <div style={{ display: 'flex', gap: 16, marginLeft:'15px'}}>
        {artists.map(artist => (
          <div key={artist.id} style={{ textAlign: 'center' }}>
            {artist.logo && (
              <img
                src={artist.logo}
                alt={artist.name}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1px solid #ccc',
                  marginBottom: 4,
                }}
              />
            )}
            <div style={{ fontSize: 14 }}>{artist.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Chatbox() {
  return (
    <div className="chatbox">
      
<iframe
  title="KCHUNG Radio chat room"
  src="https://app.radiocult.fm/embed/chat/kchung-radio-01e54a81?theme=custom&primaryColor=%23ffffff&corners=sharp&playerDisplay=metadata&ptc=%23000000&stc=%23000000&bc=%23ff0000&font=Courier%2BPrime&inmc=%235de2ff&outmc=%23ff98f2&stationmc=%238dff57&sepc=%231f3045"
  width="100%"
  height="600px"
  scrolling="yes"
  frameborder="0"
  seamless
  allowtransparency="true"
></iframe>
    </div>
  )
}

function NowPlaying() {
  const { data: liveShow } = useSWR(
    'https://api.radiocult.fm/api/station/kchung-radio-01e54a81/schedule/live',
    fetcherWithApiKey
  )
  console.log('liveShow:', liveShow)

  // Adjust these property paths based on the actual API response
  const show = liveShow?.result?.content
  const artists = show?.artistIds
  const description = show?.description?.content?.[0]?.content?.[0]?.text || 'On KCHUNG'
  const title = show?.title || 'No show live'

  return (
    <div className="now-playing">
      <h2>You are listening to:</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, border:'2px solid white', padding: '1%' }}>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: 22 }}>{title}</div>
          <p>{description}</p>
          <ArtistList artistIds={artists} />
        </div>
      </div>
      
    </div>
  )
}

export default function StreamPage() {
  return (
    <div id="main" className="stream-layout">
      <NowPlaying />
      <Chatbox />
    </div>
  )
}
