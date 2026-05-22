'use client'

import { useRef, useState, useEffect } from 'react'
import useSWR from 'swr'
//import SocketIo from 'socket.io-client' <-- for future dev
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'

import radiocultJsonFetcher from '../lib/swr/radiocultJsonFetcher.js'

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


  const { data: liveShow } = useSWR(
    '/schedule/live',
    radiocultJsonFetcher,
  )

  console.log('liveShow:', liveShow)

  const liveMetadata =
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

  return (
    <div className="player">
      <Player
        location={liveStatus}
        isPlaying={isPlayingChinatown}
        handlePlay={handlePlayClickMain}
        handlePause={handlePauseClickMain}
        metadata={liveMetadata}
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
