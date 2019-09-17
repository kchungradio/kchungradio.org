const db = require('./db')

module.exports = async function(req, res) {
  if (req.url.includes('favicon')) return

  const { limit = 50, page = 0 } = req.query

  const data = await db
    .query(
      `SELECT date, path FROM radio.archive
       ORDER BY date DESC
       LIMIT $1 OFFSET $2`,
      [limit, page * limit]
    )
    .then(data => data.rows)
    .then(rows =>
      rows.map(row => ({
        ...row,
        date: row.date.toISOString().split('T')[0]
      }))
    )
    .catch(console.error)

  res.status(200).json(data)
}
