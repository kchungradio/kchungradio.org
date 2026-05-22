'use client'

import { useRef, useState, useEffect } from 'react'
import useSWR from 'swr'
//import SocketIo from 'socket.io-client' <-- for future dev
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'

import jsonFetcher from '../lib/swr/jsonFetcher'

function Player({ location, isPlaying, handlePlay, handlePause, metadata }) {
  return (
    <div className={`player-${location}`}>
      <div className="player-controls">
        <span style={{ cursor: 'pointer', userSelect: 'none' }}>
          {isPlaying ? (
            <span onClick={handlePause}>
              <FontAwesomeIcon icon={faPause} style={{ fontSize: '1em' }} />
            </span>
          ) : (
            <span onClick={handlePlay}>
              <FontAwesomeIcon icon={faPlay} style={{ fontSize: '1em' }} />
            </span>
          )}
        </span>
      </div>
      <span style={{ wordBreak: 'break-all' }}>{metadata}</span>
      <span className="location" style={{ minWidth: 110, paddingLeft: '1em' }}>
        {location}
      </span>
    </div>
  )
}

function Stream() {
  const audioMainRef = useRef()
  const audioPublicRef = useRef()
  const [isPlayingChinatown, setIsPlayingChinatown] = useState(false)
  const [isPlayingMoca, setIsPlayingMoca] = useState(false)

  function handlePauseClickMain() {
    audioMainRef.current.pause()
    setIsPlayingChinatown(false)
  }

  function handlePlayClickMain() {
    if (isPlayingMoca) handlePauseClickPublic()
    audioMainRef.current.play().catch(console.error)
    setIsPlayingChinatown(true)
  }

  function handlePauseClickPublic() {
    audioPublicRef.current.pause()
    setIsPlayingMoca(false)
  }

  function handlePlayClickPublic() {
    if (isPlayingChinatown) handlePauseClickMain()
    audioPublicRef.current.play().catch(console.error)
    setIsPlayingMoca(true)
  }

  // // Add state for Radio Cult metadata
  // const [ch1metadata, setCh1metadata] = useState('')

  // useEffect(() => {
  //   const io = SocketIo('https://api.radiocult.fm', {
  //     auth: {
  //       'x-api-key': 'pk_2b3e0601b08845bd895ef1f5c8c19452',
  //     },
  //     transports: ['websocket'],
  //     query: {
  //       stationId: 'kchung-radio-01e54a81',
  //     },
  //   })

  //   io.on('connect_error', (err) => {
  //   console.error('Socket connection error:', err)
  // })

  //   io.on('player-metadata', ({ status, content, metadata }) => {
  //     // You may want to adjust this depending on the structure of metadata
  //     console.log('player-metadata event:', { status, content, metadata }) // <-- Add this line
  //     setCh1metadata(metadata?.title || content || '')
  //   })

  //   return () => {
  //     io.disconnect()
  //   }
  // }, [])

  const fetcherWithApiKey = (url) =>
    fetch(url, {
      headers: { 'x-api-key': 'pk_2b3e0601b08845bd895ef1f5c8c19452' },
    }).then((res) => res.json())

  const { data: liveShow } = useSWR(
    'https://api.radiocult.fm/api/station/kchung-radio-01e54a81/schedule/live',
    fetcherWithApiKey,
  )
  console.log('liveShow:', liveShow)

  const ch1metadata =
    liveShow?.result?.content?.title ||
    liveShow?.result?.metadata?.title ||
    'No show live'

  const PUBLIC_STUDIO_ID = '09d795c5-2b49-4084-98d9-46fbb07cc4b3' // <-- replace with actual ID
  const CHINATOWN_STUDIO_ID = 'd12662d4-4a3f-4c3e-8c8e-9b3d4b06cc81'

  let liveStatus = 'Loading...'
  if (liveShow?.result?.status === 'schedule') {
    const artistIDs = liveShow?.result?.content?.artistIds || []
    if (artistIDs.includes(PUBLIC_STUDIO_ID)) {
      liveStatus = 'live from moca geffen'
    } else if (artistIDs.includes(CHINATOWN_STUDIO_ID)) {
      liveStatus = 'live from chinatown'
    } else {
      liveStatus = 'live'
    }
  } else {
    liveStatus = 'off-air'
  }

  const { data: liveInfoCh2 } = useSWR(
    'https://kchungpublic.airtime.pro/api/live-info-v2',
    jsonFetcher,
  )
  const ch2metadata =
    liveInfoCh2?.tracks?.current?.metadata?.filepath ||
    liveInfoCh2?.shows?.current?.name

  return (
    <div className="player">
      <Player
        location={liveStatus}
        isPlaying={isPlayingChinatown}
        handlePlay={handlePlayClickMain}
        handlePause={handlePauseClickMain}
        metadata={ch1metadata}
      />

      <audio ref={audioMainRef} id="player-chinatown" preload="none">
        <source
          src="https://kchung-radio-01e54a81.radiocult.fm/stream"
          type="audio/mp3"
        />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}

export default Stream
