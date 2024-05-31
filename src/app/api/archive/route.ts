import { NextResponse } from 'next/server'
import { query } from '../../../lib/db'

export async function GET(req) {
  if (req.url.includes('favicon')) return

  const { searchParams } = new URL(req.url)

  let limit = 50
  if (searchParams.has('limit')) {
    limit = parseInt(searchParams.get('limit'))
    if (isNaN(limit)) {
      limit = 50
    }
  }

  let page = 0
  if (searchParams.has('page')) {
    page = parseInt(searchParams.get('page'))
    if (isNaN(page)) {
      page = 0
    }
  }

  let search = ''
  if (searchParams.has('search')) {
    search = searchParams.get('search')
  }

  console.log(search)
  const searchWild = search.trim().replace(/ /g, '%').replace(/\*/g, '%')

  const data = await query(
    `SELECT id, date, path
     FROM radio.archive
     WHERE path ILIKE $3
     ORDER BY date DESC
     LIMIT $1 OFFSET $2`,
    [limit, page * limit, `%${searchWild}%`],
  )
  const rows = data.rows.map((row) => ({
    ...row,
    date: row.date.toISOString().split('T')[0],
  }))

  return NextResponse.json(rows)
}
