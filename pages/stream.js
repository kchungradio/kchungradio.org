import React, { useRef, useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'

import jsonFetcher from '../swr/jsonFetcher'
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

  const { data: liveInfo } = useSWR(
    'https://kchungradio.airtime.pro/api/live-info-v2',
    jsonFetcher
  )
  const showMetadata =
    liveInfo?.tracks?.current?.metadata?.filepath ||
    liveInfo?.shows?.current?.name

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

      <div>
        <div>now playing: </div>
        <div>{showMetadata}</div>
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

      <div id="tlkio" style={{ width: '600px', height: '400px' }}>
        <iframe
          src="https://embed.tlk.io/kchung?custom_css_path=https://www.kchungradio.org/css/style.css&amp;theme=theme--minimal"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ marginBottom: -8 }}
        ></iframe>
      </div>
    </div>
  )
}

export default StreamPage
