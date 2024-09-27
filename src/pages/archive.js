import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { format, parseISO } from 'date-fns'
import useSWRInfinite from 'swr/infinite'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import 'intersection-observer' // polyfill for IE11

import jsonFetcher from '../lib/swr/jsonFetcher'
import { slugify, unslugify } from '../lib/slugify'

const region = 'us-west-2'
const s3 = `https://s3-${region}.amazonaws.com/archive.kchungradio.org/`

function ArchivePage() {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [hasNextPage, setHasNextPage] = useState(true)

  useEffect(() => {
    const querySearch = router.query.search
    let search
    if (querySearch) {
      search = unslugify(decodeURIComponent(querySearch))
    }
    setSearchInput(search ?? '')
    setSearch(search ?? '')
  }, [router.query])

  const { data, error, setSize, isValidating } = useSWRInfinite(
    (index) => {
      let url = `api/archive?page=${index}`
      if (search) {
        const urlSafeSearch = encodeURIComponent(search)
        url += `&search=${urlSafeSearch}`
      }
      return url
    },
    jsonFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateFirstPage: false,
      revalidateOnReconnect: false,
      onSuccess: function (data) {
        // if no more data, stop loading
        const lastData = data[data.length - 1]
        if (lastData && !lastData.length) {
          setHasNextPage(false)
        }
      },
    }
  )

  function handleLoadMore() {
    setSize((size) => size + 1)
  }

  const [infiniteRef] = useInfiniteScroll({
    loading: isValidating,
    hasNextPage,
    onLoadMore: handleLoadMore,
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px',
  })

  if (error) {
    return <div>Unable to access the archive, please try again later...</div>
  }

  // get array of data from array of arrays
  const shows = data ? [].concat(...data) : []

  const showsByDate = shows.reduce((acc, show) => {
    if (!acc[show.date]) {
      acc[show.date] = []
    }
    acc[show.date].push(show)
    return acc
  }, {})

  const showsByDateContent = Object.keys(showsByDate).map((date) => {
    // date header
    const dateDisplayStr = format(parseISO(date), 'EEEE, MMMM do, yyyy')
    const dateContent = (
      <div>
        <b>{dateDisplayStr}</b>
      </div>
    )

    // list of shows under date header
    const shows = showsByDate[date]
    const showsContent = shows.map((show, idx, shows) => {
      const filename = show.path.split('/').pop()
      return (
        <div
          key={show.id}
          style={{ marginBottom: idx === shows.length - 1 ? 17 : 0 }}
        >
          <a href={s3 + show.path} target="_blank" rel="noreferrer">
            {filename}
          </a>
        </div>
      )
    })

    return (
      <div key={date}>
        <div>{dateContent}</div>
        <div>{showsContent}</div>
      </div>
    )
  })

  function resetList() {
    setHasNextPage(true)
  }

  function handleSearchInputChange(event) {
    const searchInput = event.target.value
    setSearchInput(searchInput)
  }

  function handleSearchButtonClick(event) {
    event.preventDefault()
    event.stopPropagation()
    setSearch(searchInput)
    if (searchInput) {
      const urlSafeSearch = encodeURIComponent(slugify(searchInput))
      router.push(`?search=${urlSafeSearch}`)
    } else {
      router.push('')
    }
    resetList()
  }

  return (
    <div id="main" style={{ textAlign: 'center' }}>
      <form onSubmit={handleSearchButtonClick}>
        <input
          value={searchInput}
          onInput={handleSearchInputChange}
          style={{ marginRight: 8 }}
        />
        <button type="submit">search</button>
      </form>

      <br />

      <div>{showsByDateContent}</div>
      {isValidating && <div>Loading...</div>}
      <div ref={infiniteRef} />
    </div>
  )
}

export default ArchivePage
