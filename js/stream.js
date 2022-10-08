;(function() {
  var liveInfoUrl = 'https://kchungradio.airtime.pro/api/live-info-v2'
  // Visit URL below to understand SHOUTcast's metadata html response format
  var publicInfoUrl = 'http://s9.voscast.com:7376/7.html'

  var showNameEl = document.getElementById('showName')
  var trackNameEl = document.getElementById('trackName')

  var playButton = $('.play-button')
  var playButtonPublic = $('.play-button-public')

  var contentRegex = /<body>(.*)<\/body>/

  function parseShoutcastResponse(html) {
    var content = html.match(contentRegex)[1]
    var parts = content.split(',')
    if (parts.length < 7 || !parts[6]) {
      return null
    }
    return parts[6]
  }

  // this runs after the DOM has loaded
  $(function() {
    if (!playButton.hasClass('hidden')) {
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
    } else if (!playButtonPublic.hasClass('hidden')) {
      // If public stream is playing
      $.get(publicInfoUrl, function(publicInfoHtml) {
        var showNameText = parseShoutcastResponse(publicInfoHtml)
        if (showNameText) {
          trackNameEl.innerText = null
          showNameEl.innerText = showNameText
        }
      })
    }
  })
})()
