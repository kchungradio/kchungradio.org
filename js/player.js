// KCHUNG Stream Player Widget

//------------------------------------------------------------------------------
// Data

const audioPlayer = document.querySelector(".audio-player");
const audio = new Audio("https://kchungradio.out.airtime.pro/kchungradio_a");

const stationSelect = document.getElementById('station-select')
const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
const playButton = audioPlayer.querySelector(".controls .toggle-play");

//------------------------------------------------------------------------------
// Callbacks

const setFullVolume = () => audio.volume = 1.0;

const adjustVolume = (e) => {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audio.volume = newVolume;
  audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
}

const togglePlayback = () =>
  audio.paused
    ? (playButton.classList.replace("la-play", "la-pause"), audio.play())
    : (playButton.classList.replace("la-pause", "la-play"), audio.pause())

const toggleMute = () => {
  const volumeEl = audioPlayer.querySelector(".volume-container .volume");
  audio.muted = !audio.muted;
  audio.muted
    ? volumeEl.classList.replace("la-volume-up", "la-volume-off")
    : volumeEl.classList.replace("la-volume-off", "la-volume-up")
}

const updateShowInfo = async () => {
  const liveInfoUrl = 'https://kchungradio.airtime.pro/api/live-info-v2'
  const showInfoEl = document.getElementById('name')

  const getAirtimeInfo = (resp) => {
    let track = resp?.tracks?.current?.metadata?.filepath;
    let show = resp?.shows?.current?.name 
    return track ? track : show ? show : ""
  }

  const geffinInfo = "Live from KCHUNG Public"
  const response = await fetch(liveInfoUrl)
  const data = await response.json()
  showInfoEl.innerText = stationSelect.value === "1" ? getAirtimeInfo(data) : geffinInfo
}

const toggleStream = async (e) => {
  const toggle = (src) =>
    src === "1"
      ? "https://kchungradio.out.airtime.pro/kchungradio_a"
      : "http://s9.voscast.com:7376/;" 

  const newStream = toggle(e.srcElement.value)

  if (audio.paused) return audio.load()  
  audio.src = newStream
  audio.addEventListener('canplay', () => audio.play())
  audio.load()
}

//------------------------------------------------------------------------------
// Event Listeners

// Initialize the show info on page load
window.addEventListener("load", updateShowInfo);

// Reset volume when loading the stream
audio.addEventListener("loadeddata", setFullVolume);

// Change the volume when user clicks the volume slider
volumeSlider.addEventListener('click', adjustVolume)

// Pause or Play the stream when user clicks the play/pause button.
playButton.addEventListener("click", togglePlayback);

// Toggle mute when user clicks on volume icon
audioPlayer.querySelector(".volume-button").addEventListener("click", toggleMute);

// Periodically refresh the show info
// stationSelect.addEventListener("change", updateShowInfo)

// Toggle between streams on changes to the select element
stationSelect.addEventListener("change", (e) => toggleStream(e).then(updateShowInfo));
