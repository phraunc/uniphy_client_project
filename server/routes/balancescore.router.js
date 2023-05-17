const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();


router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM balance_score
    WHERE date = '2023-05-17'`
    // const sqlValue = [req.params.date]
    pool.query(sqlText)
    .then((result) => {
        res.send(result.rows)
    }).catch((err) => {
        console.log('error in balance score get', err)
        res.sendStatus(500)
    })
})

router.post('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `INSERT INTO balance_score ("user_id", "balance_score")
    VALUES ($1, '0')`
    const sqlValue = [
        req.user.id
    ]
    pool.query(sqlText, sqlValue)
    .then((result) => {
        res.sendStatus(200)
    }).catch((err) => {
        console.log('error in balance score post', err)
        res.sendStatus(500)
    })
})



module.exports = router;