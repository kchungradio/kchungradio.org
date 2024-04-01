/* eslint-disable react/prop-types */

import React, { useMemo } from 'react'

import CalendarCell from './CalendarCell'

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

      <style jsx>{`
        .calendar {
          width: 1071px;
          font-family: courier, sans-serif;
          background: red;
          color: white;
          margin: 0;
          padding: 0;
          font-size: 13px;
        }
        .day {
          display: inline-block;
          width: 148px;
          padding-bottom: 1px;
          text-align: center;
        }
        .blank {
          display: inline-block;
          height: 145px;
          width: 148px;
        }
        a {
          color: white;
          cursor: pointer;
        }
        a:hover {
          background: white;
          color: red;
          text-decoration: none;
        }
        a:link {
          text-decoration: none;
        }
        a:visited {
          text-decoration: none;
        }
      `}</style>
    </div>
  )
}
