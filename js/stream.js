;(function() {
  var liveInfoUrl = 'https://kchungradio.airtime.pro/api/live-info-v2'
  var showNameEl = document.getElementById('showName')

  // this runs after the DOM has loaded
  $(function() {
    $.get(liveInfoUrl, function(liveInfo) {
      var showNameText

      if (
        liveInfo &&
        liveInfo.shows &&
        liveInfo.shows.current &&
        liveInfo.shows.current.name
      ) {
        showNameText = liveInfo.shows.current.name
        showNameEl.innerText = showNameText
      } else if (
        liveInfo &&
        liveInfo.tracks &&
        liveInfo.tracks.current &&
        liveInfo.tracks.current.metadata &&
        liveInfo.tracks.current.metadata.filepath
      ) {
        showNameText = liveInfo.tracks.current.metadata.filepath
        showNameEl.innerText = showNameText
      } else {
        showNameEl.innerText = 'kchung radio is offline...'
      }
    })
  })
})()
