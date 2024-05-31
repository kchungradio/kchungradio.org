import React from 'react'
import dotenv from 'dotenv'
import Calendar from '../components/Calendar/Calendar'
import { parseErrorObject } from '../src/lib/parseErrorObject'
import jsonFetcher from '../swr/jsonFetcher'
dotenv.config()

const MOCA_SCHEDULE_ID =
  'c_a93f305736de4f5767385cd52ad13bbacddb68b92d5b69a6b8ec7b7bea3d6719@group.calendar.google.com'

export const getServerSideProps = async () => {
  try {
    const data = await jsonFetcher(
      `${process.env.API_ENDPOINT}/api/schedule/${MOCA_SCHEDULE_ID}`,
    )
    return { props: { events: data, eventsError: null } }
  } catch (error) {
    return { props: { events: null, eventsError: parseErrorObject(error) } }
  }
}

export default function Ch2Page({ events, eventsError }) {
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
