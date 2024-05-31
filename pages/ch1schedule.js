import React from 'react'
import dotenv from 'dotenv'
import Calendar from '../components/Calendar/Calendar'
import { parseErrorObject } from '../src/lib/parseErrorObject'
import jsonFetcher from '../swr/jsonFetcher'
dotenv.config()

const CHINATOWN_SCHEDULE_ID =
  'kchungradio.org_dal1nqjjuh3kvb65bjhdab545g@group.calendar.google.com'

export const getServerSideProps = async () => {
  try {
    const data = await jsonFetcher(
      `${process.env.API_ENDPOINT}/api/schedule/${CHINATOWN_SCHEDULE_ID}`,
    )
    console.log('data', data)
    return { props: { events: data, eventsError: null } }
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
