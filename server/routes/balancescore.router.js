const express = require("express");
const pool = require("../modules/pool");
const {
    rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM balance_score
    WHERE date = CURRENT_DATE AND user_id = $1;`
    const sqlValue = [req.user.id]
    pool.query(sqlText, sqlValue)
        .then((result) => {
            res.send(result.rows)
        }).catch((err) => {
            console.log('error in balance score get', err)
            res.sendStatus(500)
        })
})

router.get('/average', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT AVG(score_sa) AS social_score,
    AVG(score_s) AS sleep_score,
    AVG(score_o) AS occupation_score,
    AVG(score_m) AS movement_score,
    AVG(score_f) AS food_score
    from balance_score 
   WHERE date > current_date - interval '7 days'
   AND user_id = $1
   limit 7;`
    const sqlValue = [req.user.id]
    pool.query(sqlText, sqlValue)
        .then((result) => {
            res.send(result.rows)
        }).catch((err) => {
            console.log('error in balance score get', err)
            res.sendStatus(500)
        })
})

router.post('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `INSERT INTO balance_score ("user_id", "balance_score", score_m, score_sa, score_o, score_f, score_s, score_w)
    VALUES ($1, '0', '0', '0', '0', '0', '0', '0')`
    const sqlValue = [req.user.id]
    pool.query(sqlText, sqlValue)
        .then((result) => {
            res.sendStatus(200)
        }).catch((err) => {
            console.log('error in balance score post', err)
            res.sendStatus(500)
        })
})

module.exports = router;