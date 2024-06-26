import { useRef, useState } from 'react'
import useSWR from 'swr'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'

import jsonFetcher from '../swr/jsonFetcher'

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

function Chatbox() {
  return (
    <div className="chatbox">
      <iframe
        src="https://embed.tlk.io/kchung?custom_css_path=https://www.kchungradio.org/css/chat-style.css&amp;theme=theme--minimal"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ height: '400px' }}
      ></iframe>
    </div>
  )
}

export default function StreamPage() {
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

  const { data: liveInfoCh1 } = useSWR(
    'https://kchungradio.airtime.pro/api/live-info-v2',
    jsonFetcher,
  )
  const ch1metadata =
    liveInfoCh1?.tracks?.current?.metadata?.filepath ||
    liveInfoCh1?.shows?.current?.name

  const { data: liveInfoCh2 } = useSWR(
    'https://kchungpublic.airtime.pro/api/live-info-v2',
    jsonFetcher,
  )
  const ch2metadata =
    liveInfoCh2?.tracks?.current?.metadata?.filepath ||
    liveInfoCh2?.shows?.current?.name

  return (
    <div id="main">
      <div className="player">
        <Player
          location="chinatown"
          isPlaying={isPlayingChinatown}
          handlePlay={handlePlayClickMain}
          handlePause={handlePauseClickMain}
          metadata={ch1metadata}
        />

        <Player
          location="moca geffen"
          isPlaying={isPlayingMoca}
          handlePlay={handlePlayClickPublic}
          handlePause={handlePauseClickPublic}
          metadata={ch2metadata}
        />
      </div>

      <Chatbox />

      <audio ref={audioMainRef} id="player-chinatown" preload="none">
        <source
          src="https://kchungradio.out.airtime.pro/kchungradio_a"
          type="audio/mp3"
        />
        Your browser does not support the audio element.
      </audio>

      <audio ref={audioPublicRef} id="player-public" preload="none">
        <source
          src="https://kchungpublic.out.airtime.pro/kchungpublic_a"
          type="audio/mp3"
        />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}
