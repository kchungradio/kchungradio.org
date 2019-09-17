const pg = require('pg')

const pool = new pg.Pool()

module.exports = {
  query: (text, params) => pool.query(text, params)
}
