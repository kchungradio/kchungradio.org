'use client'

import useSWRInfinite from 'swr/infinite'

import Calendar from '../../components/Calendar/Calendar'
import { parseErrorObject } from '../../lib/parseErrorObject'
import jsonFetcher from '../../lib/swr/jsonFetcher'

const MOCA_SCHEDULE_ID =
  'c_a93f305736de4f5767385cd52ad13bbacddb68b92d5b69a6b8ec7b7bea3d6719@group.calendar.google.com'

export default function Ch2Page() {
  const { data, error } = useSWRInfinite(
    () => `api/schedule/${MOCA_SCHEDULE_ID}`,
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
