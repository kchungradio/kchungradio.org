;(function() {
  var api = '/api/archive'
  var s3 = 'http://archive.kchungradio.org/'
  var listing = document.getElementById('listing')
  var currentDate
  var page = 0
  var search = ''
  var gettingShows = false
  var firstRow = true
  var moreShows = true

  // this runs after the DOM has loaded
  $(function() {
    getShows(page, search)

    // infinite scroll
    window.addEventListener('scroll', function() {
      var windowBottom = window.scrollY + window.innerHeight
      var listingBottom =
        window.scrollY + listing.getBoundingClientRect().bottom
      if (windowBottom >= listingBottom && !gettingShows && moreShows) {
        page = page + 1
        getShows(page, search)
      }
    })

    // search
    var searchForm = document.getElementById('search-form')
    searchForm.addEventListener('submit', submitForm)
  })

  function submitForm(e) {
    e.preventDefault()
    var searchInput = document.getElementById('search-input')
    search = searchInput.value
    clearShows()
    getShows(page, search)
  }

  function clearShows() {
    page = 0
    firstRow = true
    moreShows = true
    listing.innerHTML = ''
  }

  function getShows(page, search) {
    gettingShows = true
    addLoadingToListing()

    var query = '?page=' + page
    if (search) {
      query += '&search=' + search.trim()
    }
    var encodedURI = encodeURI(api + query)

    $.get(encodedURI, function(shows) {
      removeLoading()
      if (!shows || !shows.length) {
        moreShows = false
        return
      }
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

      show.filename = show.path.split('/').pop()

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
      showLink.setAttribute('href', s3 + show.path)
      showLink.setAttribute('target', '_blank')
      showLink.innerText = show.filename
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
