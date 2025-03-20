const express = require('express')

const router = express.Router()
const pool = require('../configs/db')

router.get('/', (req, res) => {
    pool.query('SELECT * FROM forum', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}
)   

module.exports = router



