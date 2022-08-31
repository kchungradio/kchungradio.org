import { query } from '../../db/db'

export default async function handler(req, res) {
  if (req.url.includes('favicon')) return

  const { limit = 50, page = 0, search = '' } = req.query

  // console.log({ limit, page, search })

  const searchWild = search.trim().replace(/ /g, '%').replace(/\*/g, '%')

  const data = await query(
    `SELECT date, path
     FROM radio.archive
     WHERE path ILIKE $3
     ORDER BY date DESC
     LIMIT $1 OFFSET $2`,
    [limit, page * limit, `%${searchWild}%`]
  )
  const rows = data.rows.map((row) => ({
    ...row,
    date: row.date.toISOString().split('T')[0],
  }))

  res.status(200).json(rows)
}
