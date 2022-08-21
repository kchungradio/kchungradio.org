;(function() {
  var liveInfoUrl = 'https://kchungradio.airtime.pro/api/live-info-v2'

  var showNameEl = document.getElementById('showName')
  var trackNameEl = document.getElementById('trackName')

  // this runs after the DOM has loaded
  $(function() {
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
      } else if (
        liveInfo &&
        liveInfo.shows &&
        liveInfo.shows.current &&
        liveInfo.shows.current.name
      ) {
        showNameText = liveInfo.shows.current.name
        showNameEl.innerText = showNameText
      }
    })
  })
})()
