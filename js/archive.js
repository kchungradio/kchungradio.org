;(function() {
  var api = '/api/archive'
  var s3 = 'http://archive.kchungradio.org/'
  var listing = document.getElementById('listing')
  var currentDate
  var page = 0
  var gettingShows = false
  var firstRow = true

  // this runs after the DOM has loaded
  $(function() {
    getShows(page)

    // infinite scroll
    window.addEventListener('scroll', function() {
      var windowBottom = window.scrollY + window.innerHeight
      var listingBottom =
        window.scrollY + listing.getBoundingClientRect().bottom
      if (windowBottom >= listingBottom && !gettingShows) {
        page = page + 1
        getShows(page)
      }
    })
  })

  function getShows(page) {
    gettingShows = true
    addLoadingToListing()
    var query = '?page=' + page
    $.get(api + query, function(shows) {
      removeLoading()
      appendShows(shows)
      gettingShows = false
    })
  }

  function appendShows(shows) {
    shows.forEach(function(show, idx) {
      if (firstRow && idx > 0) {
        firstRow = false
      }
      var dateStr = show.date
      var dateDisplayStr = dateFns.format(dateStr, 'dddd, MMMM Do, YYYY')

      var path = show.path
      var filename = path.split('/').pop()

      // add date heading
      if (dateStr !== currentDate) {
        var headingDiv = document.createElement('div')
        var headingContent = document.createElement('b')
        headingContent.innerText = dateDisplayStr
        headingDiv.appendChild(headingContent)
        !firstRow && listing.appendChild(document.createElement('br'))
        listing.appendChild(headingDiv)
      }

      // add show
      var showDiv = document.createElement('div')
      var showLink = document.createElement('a')
      showLink.setAttribute('href', s3 + path)
      showLink.setAttribute('target', '_blank')
      showLink.innerText = filename
      showDiv.appendChild(showLink)
      listing.appendChild(showDiv)

      currentDate = dateStr
    })
  }

  function addLoadingToListing() {
    var loadingDiv = document.createElement('div')
    loadingDiv.id = 'loading'
    var loadingContent = document.createTextNode('Loading...')
    loadingDiv.appendChild(loadingContent)
    listing.appendChild(loadingDiv)
  }

  function removeLoading() {
    var loading = document.getElementById('loading')
    loading.remove()
  }
})()
