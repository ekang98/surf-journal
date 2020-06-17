const Pool = require('pg').Pool
const pool = new Pool({
  user: 'surftrack',
  host: 'localhost',
  database: 'surftrackapi',
  password: 'tiger123',
  port: 5432,
})

const getEntries = (request, response) => {
  pool.query('SELECT * FROM entries ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createEntry = (request, response) => {
  const { spot, tide, swellsize, swelldirection, swellperiod, winddirection, windspeed, rating } = request.body

  pool.query('INSERT INTO entries (SPOT, TIDE, SWELLSIZE, SWELLDIRECTION, ' + 
      'SWELLPERIOD, WINDDIRECTION, WINDSPEED, RATING) VALUES ' + 
      '($1, $2, $3, $4, $5, $6, $7, $8)', 
      [spot, tide, swellsize, swelldirection, swellperiod, winddirection, windspeed, rating], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Entry added with ID: ${result.insertId}`)
  })
}

module.exports = {
  getEntries,
  createEntry,
}