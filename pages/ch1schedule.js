import React from 'react'
import Calendar from '../components/Calendar/Calendar'
import { fetchCalendar, parseErrorObject } from '../lib/fetchCalendar'

const CHINATOWN_SCHEDULE_ID =
  'kchungradio.org_dal1nqjjuh3kvb65bjhdab545g@group.calendar.google.com'

export async function getStaticProps() {
  try {
    const result = await fetchCalendar(CHINATOWN_SCHEDULE_ID)
    return { props: { events: result, eventsError: null } }
  } catch (error) {
    return { props: { events: null, eventsError: parseErrorObject(error) } }
  }
}

export default function Ch1Page({ events, eventsError }) {
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
