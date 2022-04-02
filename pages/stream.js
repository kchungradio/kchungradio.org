import React, { useRef, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'

function StreamPage() {
  const audioRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)

  function handlePauseClick() {
    audioRef.current.pause()
    setIsPlaying(false)
  }

  function handlePlayClick() {
    audioRef.current.play()
    setIsPlaying(true)
  }

  return (
    <div>
      <div>
        <span style={{ cursor: 'pointer', userSelect: 'none' }}>
          {isPlaying ? (
            <span onClick={handlePauseClick}>
              <FontAwesomeIcon icon={faPause} style={{ fontSize: '10em' }} />
            </span>
          ) : (
            <span onClick={handlePlayClick}>
              <FontAwesomeIcon icon={faPlay} style={{ fontSize: '10em' }} />
            </span>
          )}
        </span>
      </div>

      <br />

      <p>
        <Link href="/stream2">click here for stream 2</Link>
      </p>

      <audio ref={audioRef} id="player" className="player" preload="none">
        <source src="http://s9.voscast.com:7376/;&type=mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <br />
      <br />

      <div
        id="tlkio"
        data-channel="kchung"
        data-theme="theme--minimal"
        data-custom-css="https://www.kchungradio.org/css/style.css"
        style={{ width: '600px', height: '400px' }}
      />
      <Script src="https://tlk.io/embed.js" />
    </div>
  )
}

export default StreamPage
