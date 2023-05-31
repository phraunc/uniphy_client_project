const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

router.get("/", rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM sleep
  WHERE user_id = $1 ORDER BY id DESC;`;
  pool.query(sqlText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in get route sleep", err);
      res.sendStatus(500);
    });
});

// Get by ID route
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM sleep WHERE sleep.id = $1`
  const sqlValue = [req.params.id]
  pool.query(sqlText, sqlValue)
    .then((result) => {
      res.send(result.rows)
    })
    .catch((err) => {
      console.log('error in our sleep get by id route', err)
      res.sendStatus(500)
    })
})

router.post("/", rejectUnauthenticated, (req, res) => {
  const sqlText = `INSERT INTO sleep (user_id, score_s, duration, quality, screen_time, start_sleep, end_sleep, total_points)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
  const sqlValue = [
    req.user.id,
    req.body.score_s,
    req.body.duration,
    req.body.quality,
    req.body.screen_time,
    req.body.start_sleep,
    req.body.end_sleep,
    req.body.total_points];
  pool.query(sqlText, sqlValue)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in post route sleep", err);
      res.sendStatus(500);
    });
});

router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `DELETE FROM "sleep" WHERE "sleep".id = $1 AND user_id = $2;`;
  const sqlValue = [req.params.id, req.user.id];
  pool.query(sqlText, sqlValue)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("err deleting router sleep", err);
      res.sendStatus(500);
    });
});

router.put("/edit/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "sleep"
    SET "score_s"=$1, "duration"=$2, "quality"=$3, "screen_time"=$4, "start_sleep"=$5, "end_sleep"=$6
    WHERE "sleep".id = $7 AND user_id = $8;`;
  sqlValue = [
    req.body.score_s,
    req.body.duration,
    req.body.quality,
    req.body.screen_time,
    req.body.start_sleep,
    req.body.end_sleep,
    req.params.id,
    req.user.id,];
  pool.query(sqlText, sqlValue)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in the put sleep router", err);
      res.sendStatus(500);
    });
});

router.put('/increment/', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE balance_score 
  SET "score_s"=LEAST("score_s" + $1, 100) WHERE balance_score.date = current_date AND balance_score.user_id = $2`
  const sqlValue = [
    req.body.score_s,
    req.user.id]
  pool.query(sqlText, sqlValue)
    .then((result) => {
      res.sendStatus(200)
    }).catch((err) => {
      res.sendStatus(500)
    })

})

router.put('/decrement/', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE balance_score 
  SET "score_s"=LEAST("score_s" - $1, 100) WHERE balance_score.date = current_date AND balance_score.user_id = $2`
  const sqlValue = [
    req.body.score_s,
    req.user.id]
  pool.query(sqlText, sqlValue)
    .then((result) => {
      res.sendStatus(200)
    }).catch((err) => {
      res.sendStatus(500)
    })
})

module.exports = router;