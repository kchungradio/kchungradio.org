// this runs after the DOM has loaded
;(function() {
  let liveInfoUrl = 'https://kchungradio.airtime.pro/api/live-info-v2'
  // Visit URL below to understand SHOUTcast's metadata html response format
  // TODO: Figure out how to pull this info without getting a CORS error
  // var publicInfoUrl = 'http://s9.voscast.com:7376/7.html'

  let showInfoEl = document.getElementById('name')
  //let selectEl = document.getElementById('station-select')

  let getAirtimeInfo = (resp) => {
    let track = resp?.tracks.current.metadata.filepath;
    let show = resp?.shows.current.name 
    return track ? track : show ? show : ""
  }

  let geffinInfo = "Live from KCHUNG Public"
  let playButton = $('.play-button')
  let playButtonPublic = $('.play-button-public')

  $.get(liveInfoUrl, function(resp) {
    //console.log(selectEl.value)
    //showInfoEl.innerText = selectEl.value === "1" ? getAirtimeInfo(resp) : geffinInfo
    showInfoEl.innerText = getAirtimeInfo(resp)
  })
})()
