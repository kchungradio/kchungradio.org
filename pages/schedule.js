import React from 'react'
import Calendar from '../components/Calendar/Calendar'
import { fetchCalendar } from '../lib/fetchCalendar'

const SCHEDULE_CALENDAR_ID =
  'kchungradio.org_dal1nqjjuh3kvb65bjhdab545g@group.calendar.google.com'

export async function getStaticProps() {
  const result = await fetchCalendar(SCHEDULE_CALENDAR_ID)
  return { props: { events: [] } }
}

export default function SchedulePage({ events }) {
  return (
    <div id="main">
      <Calendar events={events} />
    </div>
  )
}
