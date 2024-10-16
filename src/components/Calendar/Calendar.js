/* eslint-disable react/prop-types */

import { useMemo } from 'react'

import CalendarCell from './CalendarCell'

import './Calendar.css'

export default function Calendar({ events }) {
  const now = new Date()
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
  let blankDays = firstDay.getDay()
  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]

  const monthOfEvents = useMemo(() => {
    if (!events) {
      return []
    }

    return events
      .sort((a, b) => new Date(a.start) - new Date(b.start))
      .reduce((acc, event) => {
        const dayOfMonth = new Date(event.start).getDate()
        if (!acc[dayOfMonth - 1]) {
          acc[dayOfMonth - 1] = [event]
        } else {
          acc[dayOfMonth - 1].push(event)
        }
        return acc
      }, [])
  }, [events])

  return (
    <div className="calendar">
      <div className="days">
        {days.map((day) => (
          <div key={day} className="day">
            {day}
          </div>
        ))}
      </div>

      <div className="cells">
        {[...Array(blankDays)].map((x, i) => (
          <div key={i} className="blank" />
        ))}

        {events
          ? monthOfEvents.map((events, idx) => (
              <CalendarCell key={idx} date={idx + 1} events={events} />
            ))
          : null}
      </div>
    </div>
  )
}
