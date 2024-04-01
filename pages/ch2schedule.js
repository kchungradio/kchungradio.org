import { fetchCalendar, parseErrorObject } from '../lib/fetchCalendar'
import Calendar from '../components/Calendar/Calendar'
import React from 'react'

const MOCA_SCHEDULE_ID =
  'c_a93f305736de4f5767385cd52ad13bbacddb68b92d5b69a6b8ec7b7bea3d6719@group.calendar.google.com'

export async function getStaticProps() {
  try {
    const result = await fetchCalendar(MOCA_SCHEDULE_ID)
    return { props: { events: result, eventsError: null } }
  } catch (error) {
    return { props: { events: null, eventsError: parseErrorObject(error) } }
  }
}

export default function Ch2Page({ events, eventsError }) {
  if (eventsError) {
    console.error(`${eventsError.status}: ${eventsError.message}`)
  }

  return (
    <div id="main">
      {events ? <Calendar events={events} /> : <div>Error</div>}
    </div>
  )
}
