import React, { useEffect, useState } from 'react'
import Calendar from '../components/Calendar/Calendar'
import { fetchCalendar } from '../lib/fetchCalendar'

// for now we're loading the schedule from:
// https://github.com/kchungradio/radio-schedule-calendar
// https://github.com/kchungradio/radio-schedule-api

// TODO: replace with a new schedule from airtime

function SchedulePage() {
  const [events, setEvents] = useState()

  useEffect(() => {
    fetchCalendar().then((results) => {
      setEvents(results.events)
    })
  }, [])

  return (
    <div id="main">
      <Calendar events={events} />
      {/*<iframe*/}
      {/*  src="https://kchungradio-schedule-calendar.now.sh"*/}
      {/*  style={{*/}
      {/*    height: 1000,*/}
      {/*    border: 'none',*/}
      {/*    width: '100%',*/}
      {/*    margin: 0,*/}
      {/*    padding: 0,*/}
      {/*    overflow: 'scroll',*/}
      {/*  }}*/}
      {/*></iframe>*/}
    </div>
  )
}

export default SchedulePage
