import React from 'react'
import Calendar from '../components/Calendar/Calendar'
import { parseErrorObject } from '../src/lib/parseErrorObject'
import jsonFetcher from '../swr/jsonFetcher'
import useSWRInfinite from 'swr/infinite'

const CHINATOWN_SCHEDULE_ID =
  'kchungradio.org_dal1nqjjuh3kvb65bjhdab545g@group.calendar.google.com'

export default function Ch1Page() {
  const { data, error = {} } = useSWRInfinite(
    () => `api/schedule/${CHINATOWN_SCHEDULE_ID}`,
    jsonFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateFirstPage: false,
      revalidateOnReconnect: false,
    },
  )

  if (!data && !error) {
    return null
  }

  const events = data?.[0]
  const eventsError = parseErrorObject(error)

  return (
    <div id="main">
      {events ? (
        <Calendar events={events} />
      ) : (
        <div>
          {eventsError ? `${eventsError.status}, ${eventsError.message}` : ''}
        </div>
      )}
    </div>
  )
}
