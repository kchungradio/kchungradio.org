;(function() {
  var liveInfoUrl = 'https://kchungradio.airtime.pro/api/live-info-v2'
  // Visit URL below to understand SHOUTcast's metadata html response format
  // TODO: Figure out how to pull this info without getting a CORS error
  // var publicInfoUrl = 'http://s9.voscast.com:7376/7.html'

  var showNameEl = document.getElementById('showName')
  var trackNameEl = document.getElementById('trackName')

  var playButton = $('.play-button')
  var playButtonPublic = $('.play-button-public')

  playButton.click(function(event) {
    event.preventDefault()
    // If radio stream is playing
    $.get(liveInfoUrl, function(liveInfo) {
      var showNameText
      var trackNameText

      if (
        liveInfo &&
        liveInfo.tracks &&
        liveInfo.tracks.current &&
        liveInfo.tracks.current.metadata &&
        liveInfo.tracks.current.metadata.filepath
      ) {
        trackNameText = liveInfo.tracks.current.metadata.filepath
        trackNameEl.innerText = trackNameText
        showNameEl.innerText = ''
      } else if (
        liveInfo &&
        liveInfo.shows &&
        liveInfo.shows.current &&
        liveInfo.shows.current.name
      ) {
        showNameText = liveInfo.shows.current.name
        showNameEl.innerText = showNameText
        trackNameEl.innerText = ''
      }
    })
  })

  playButtonPublic.click(function(event) {
    event.preventDefault()
    showNameEl.innerText = 'Live from the Geffen Contemporary MOCA'
    trackNameEl.innerText = ''
  })

  // this runs after the DOM has loaded
  // $(function() {})
})()
