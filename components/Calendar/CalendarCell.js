/* eslint-disable react/prop-types */

import React from 'react'

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

      <style jsx>{`
        .cell {
          position: relative;
          display: inline-block;
          box-sizing: border-box;
          height: 150px;
          width: 150px;
          margin: 0 -2px -5px 0;
          border: 2px solid white;
          overflow: hidden;
        }
        .date {
          position: absolute;
          right: 2px;
        }
        .events {
          position: absolute;
          overflow: auto;
          width: 100%;
          height: 134px;
          line-height: 1;
          top: 12px;
          left: 2px;
          white-space: nowrap;
          //padding-right: 13px;
          //padding-bottom: 15px;
          display: flex;
          flex-direction: column;
        }
        .event {
          border: 1px solid;
          word-break: break-all;
        }
        @media (hover: none), (hover: on-demand) {
          .events {
            padding-right: 0px;
            padding-bottom: 0px;
          }
        }
      `}</style>
    </div>
  )
}
