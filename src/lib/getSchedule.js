import { sanitizeEvent } from './sanitize-event'
import moment from 'moment-timezone'
import dotenv from 'dotenv'
import { auth as googleAuth, calendar } from '@googleapis/calendar'
import { decode } from 'base-64'
dotenv.config()

const auth = new googleAuth.GoogleAuth({
  credentials: JSON.parse(decode(process.env.GOOGLE_APPLICATION_CREDENTIALS)),
  scopes: ['https://www.googleapis.com/auth/calendar.events.readonly'],
})

const googleCal = calendar({ version: 'v3', auth })

export async function getSchedule(calendarId = '') {
  const { timeMin, timeMax } = _getDates()

  const result = await googleCal.events.list({
    calendarId,
    timeMin,
    timeMax,
    singleEvents: true,
    orderBy: 'startTime',
    maxResults: 2500,
  })

  const events = result.data.items
    .filter((item) => item.start.hasOwnProperty('dateTime'))
    .map(sanitizeEvent)
  return events
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
