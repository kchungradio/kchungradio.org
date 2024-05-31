import { NextResponse } from 'next/server'
import { getSchedule } from '../../../../lib/getSchedule'

export async function GET(request, context) {
  const { params } = context
  const data = await getSchedule(params.calendarId)
  return NextResponse.json(data)
}
