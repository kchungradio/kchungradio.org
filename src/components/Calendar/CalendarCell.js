/* eslint-disable react/prop-types */

import './CalendarCell.css'

const formatAmPm = (date) => {
  let hours = new Date(date).getHours()
  const ampm = hours >= 12 ? 'p' : 'a'
  hours %= 12
  hours = hours || 12
  return hours + ampm
}

export default function CalendarCell({ date, events }) {
  return (
    <div className="cell">
      <div className="date">{date}</div>

      <div className="events">
        {events.map((event, index) => {
          const { name, start, url } = event
          const eventStr = `${formatAmPm(start)} ${name}`
          return (
            <div className="event" title={name} key={`${name}-${index}`}>
              {url ? (
                <a className="eventLink" href={url}>
                  {eventStr}
                </a>
              ) : (
                eventStr
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
