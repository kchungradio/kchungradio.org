import { calendar, auth as googleAuth } from '@googleapis/calendar'
import moment from 'moment-timezone'

export async function fetchCalendar(calendarId = '') {
  const { timeMin, timeMax } = _getDates()

  // const auth = new googleAuth.JWT(
  //   process.env.GOOGLE_API_CLIENT_EMAIL,
  //   null,
  //   Buffer.from(process.env.GOOGLE_API_PRIVATE_KEY_BASE64, 'base64').toString(
  //     'ascii',
  //   ),
  //   ['https://www.googleapis.com/auth/calendar.readonly'],
  //   process.env.GOOGLE_USER_EMAIL,
  //   process.env.GOOGLE_API_PRIVATE_KEY_ID,
  // )

  const auth = new googleAuth.JWT(
    JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_B64, 'base64').toString(),
    ),
  )

  console.log(auth)

  const googleCal = new calendar('v3', {
    auth: auth,
  })

  const result = await googleCal.events.list({
    calendarId,
    timeMin,
    timeMax,
    singleEvents: true,
    orderBy: 'startTime',
    maxResults: 2500,
  })

  console.log('--->', result)
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
