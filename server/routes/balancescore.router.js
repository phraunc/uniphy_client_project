const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();


router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('inside get for balance score ROUTE', req.body)
    
    const sqlText = `SELECT * FROM balance_score
    WHERE date = $1 AND user_id = $2;`
    const sqlValue = [req.body.date, req.user.id]
    pool.query(sqlText, sqlValue)
    .then((result) => {
        res.send(result.rows)
    }).catch((err) => {
        console.log('error in balance score get', err)
        res.sendStatus(500)
    })
})

router.post('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `INSERT INTO balance_score ("user_id", "balance_score", score_m, score_sa, score_o, score_f, score_s)
    VALUES ($1, '0', '0', '0', '0', '0', '0')`
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