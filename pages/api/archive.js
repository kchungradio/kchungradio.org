import { query } from './lib/db'

export default async function handler(req, res) {
  if (req.url.includes('favicon')) return

  const { limit = 50, page = 0, search = '' } = req.query

  // console.log({ limit, page, search })

  const _search = search.trim().replace(/ /g, '%').replace(/\*/g, '%')

  const data = await query(
    `SELECT date, path FROM radio.archive
     WHERE path ILIKE $3
     ORDER BY date DESC
     LIMIT $1 OFFSET $2`,
    [limit, page * limit, `%${_search}%`]
  )
    .then((data) => data.rows)
    .then((rows) =>
      rows.map((row) => ({
        ...row,
        date: row.date.toISOString().split('T')[0],
      }))
    )
    .catch(console.error)

  res.status(200).json(data)
}
