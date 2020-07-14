;(function() {
  var liveInfoUrl = 'https://kchungradio.airtime.pro/api/live-info-v2'
  var trackNameEl = document.getElementById('trackName')
  var showNameEl = document.getElementById('showName')

  // this runs after the DOM has loaded
  $(function() {
    $.get(liveInfoUrl, function(liveInfo) {
      var trackNameText
      var showNameText

      if (
        liveInfo &&
        liveInfo.tracks &&
        liveInfo.tracks.current &&
        liveInfo.tracks.current.metadata
      ) {
        trackNameText = liveInfo.tracks.current.metadata.filepath
      }

      if (liveInfo && liveInfo.shows && liveInfo.shows.current) {
        showNameText = liveInfo.shows.current.name
      }

      if (trackNameText && showNameText) {
        trackNameEl.innerText = trackNameText
        showNameEl.innerText = showNameText
      } else {
        showNameEl.innerText = 'kchung radio is offline...'
      }
    })
  })
})()
