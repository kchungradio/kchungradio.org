let audio = document.getElementById('player-main')
let stationSelect = document.getElementById('station-select')

let playButton = $('.play-button')
let pauseButton = $('.pause-button')

const toggle = (src) =>
  src === "1"
    ? "https://kchungradio.out.airtime.pro/kchungradio_a"
    : "http://s9.voscast.com:7376/;" 

const selectStream = (s) => {
  if (audio.paused) {
    return audio.load()
  }
  audio.src = toggle(s)
  audio.addEventListener('canplay', () => audio.play())
  audio.load()
}
//  showInfoEl.innerText = stationSelect.value ? getAirtimeInfo(resp) : geffinInfo

playButton.click(function(event) {
  event.preventDefault()
  play()
})

pauseButton.click(function(event) {
  event.preventDefault()
  pause()
})

function play() {
  playButton.toggleClass('hidden')
  pauseButton.toggleClass('hidden')

  audio.volume = 1.0
  audio.play()
}

function pause() {
  playButton.toggleClass('hidden')
  pauseButton.toggleClass('hidden')

  audio.pause()
}
