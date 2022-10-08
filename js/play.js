var audio = document.getElementById('player')
var audioPublic = document.getElementById('player-public')

var playButton = $('.play-button')
var pauseButton = $('.pause-button')
var playButtonPublic = $('.play-button-public')
var pauseButtonPublic = $('.pause-button-public')

var streamURL = 'http://s9.voscast.com:7376/;'

audioPublic.addEventListener('play', function() {
  $('#player-public').append(
    '<source id="source-dynamic" src="' + streamURL + '" type="audio/mpeg">'
  )
  audioPublic.addEventListener('pause', function() {
    $('#source-dynamic').remove()
  })
})

playButton.click(function(event) {
  event.preventDefault()
  play()
})

pauseButton.click(function(event) {
  event.preventDefault()
  pause()
})

playButtonPublic.click(function(event) {
  event.preventDefault()
  playPublic()
})

pauseButtonPublic.click(function(event) {
  event.preventDefault()
  pausePublic()
})

function play() {
  playButton.toggleClass('hidden')
  pauseButton.toggleClass('hidden')

  if (playButtonPublic.hasClass('hidden')) {
    pausePublic()
  }

  audio.volume = 1.0
  audio.play()
}

function pause() {
  playButton.toggleClass('hidden')
  pauseButton.toggleClass('hidden')

  audio.pause()
}

function playPublic() {
  playButtonPublic.toggleClass('hidden')
  pauseButtonPublic.toggleClass('hidden')

  if (playButton.hasClass('hidden')) {
    pause()
  }

  audioPublic.volume = 1.0
  audioPublic.play()
}

function pausePublic() {
  playButtonPublic.toggleClass('hidden')
  pauseButtonPublic.toggleClass('hidden')

  audioPublic.pause()
}
