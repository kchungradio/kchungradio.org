import { fetchCalendar } from '../lib/fetchCalendar'
import Calendar from '../components/Calendar/Calendar'

const EVENTS_CALENDAR_ID = ''

export async function getStaticProps() {
  const result = await fetchCalendar(EVENTS_CALENDAR_ID)
  return { props: { events: [] } }
}

export default function EventsPage() {
  return (
    <div id="main">
      <Calendar events={events} />
    </div>
  )
}
