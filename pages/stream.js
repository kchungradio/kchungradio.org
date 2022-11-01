import { useRef, useState } from 'react'
import useSWR from 'swr'

import jsonFetcher from '../swr/jsonFetcher'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'

const Player = ({location, isPlaying, handlePlay, handlePause, metadata}) => {
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
      <div>{metadata}</div>
      <span className="location">{location}</span>
    </div>
  )
}

const Chatbox = () => {
  return (
    <div className="chatbox">
      <iframe
        src="https://embed.tlk.io/kchung?custom_css_path=https://www.kchungradio.org/css/chat-style.css&amp;theme=theme--minimal"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ height: "400px" }}
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

  const { data: liveInfo } = useSWR(
    'https://kchungradio.airtime.pro/api/live-info-v2',
    jsonFetcher
  )
  const showMetadata =
    liveInfo?.tracks?.current?.metadata?.filepath ||
    liveInfo?.shows?.current?.name

  return (
    <div id="main">
      <div className="player">
        <Player location="chinatown"
                isPlaying={isPlayingChinatown}
                handlePlay={handlePlayClickMain}
                handlePause={handlePauseClickMain}
                metadata={showMetadata}
          />

        <Player location="moca geffen"
                isPlaying={isPlayingMoca}
                handlePlay={handlePlayClickPublic}
                handlePause={handlePauseClickPublic}
                metadata="Live from the Geffen Contemporary MOCA"

          />
      </div>
      
      <Chatbox />

      <audio ref={audioMainRef} id="player-chinatown" preload="none">
        <source src="https://kchungradio.out.airtime.pro/kchungradio_a" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <audio ref={audioPublicRef}id="player-public" preload="none">
        <source src="http://s9.voscast.com:7376/;" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}
