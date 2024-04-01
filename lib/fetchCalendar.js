import { calendar, auth as googleAuth } from '@googleapis/calendar'
import moment from 'moment-timezone'
import dotenv from 'dotenv'
import { decode } from 'base-64'
import { sanitizeEvent } from './sanitize-event'
dotenv.config()

const auth = new googleAuth.GoogleAuth({
  credentials: JSON.parse(decode(process.env.GOOGLE_APPLICATION_CREDENTIALS)),
  scopes: ['https://www.googleapis.com/auth/calendar.events.readonly'],
})

const googleCal = calendar({ version: 'v3', auth })

export async function fetchCalendar(calendarId = '') {
  const { timeMin, timeMax } = _getDates()

  const result = await googleCal.events.list({
    calendarId,
    timeMin,
    timeMax,
    singleEvents: true,
    orderBy: 'startTime',
    maxResults: 2500,
  })

  return result.data.items
    .filter((item) => item.start.hasOwnProperty('dateTime'))
    .map(sanitizeEvent)
}

function _getDates() {
  // Working?
  if (process.env.TZ) moment.tz.setDefault(process.env.TZ)

  const now = new Date()
  const year = now.getUTCFullYear()
  const month = now.getUTCMonth() + 1

  const timeMin = moment.tz([year, month - 1], 'America/Los_Angeles').format()
  const timeMax = moment
    .tz([year, month - 1], 'America/Los_Angeles')
    .endOf('month')
    .format()

  return { timeMin, timeMax }
}

export const parseErrorObject = (error) => {
  if (error.response) {
    return {
      status: error.response.data.error.code,
      message: error.response.data.error.message,
    }
  }
  return null
}
