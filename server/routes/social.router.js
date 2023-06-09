
const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

router.get("/", rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM social_activity
  WHERE user_id = $1 ORDER BY id DESC;`;
  pool.query(sqlText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in GET route social_activity", err);
      res.sendStatus(500);
    });
});

// Get by ID route
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM social_activity WHERE social_activity.id = $1`
  const sqlValue = [req.params.id]
  pool.query(sqlText, sqlValue)
    .then((result) => {
      res.send(result.rows)
    })
    .catch((err) => {
      console.log('error in our social_activity GET by id route', err)
      res.sendStatus(500)
    })

})

router.post("/", rejectUnauthenticated, (req, res) => {
  const sqlText = `INSERT INTO social_activity (user_id, score_sa, whom, rating, description, duration, online, total_points)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
  const sqlValue = [
    req.user.id,
    req.body.score_sa,
    req.body.whom,
    req.body.rating,
    req.body.description,
    req.body.duration,
    req.body.online,
    req.body.total_points];
  pool.query(sqlText, sqlValue)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in POST route social_activity", err);
      res.sendStatus(500);
    });
});

router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `DELETE FROM "social_activity" WHERE "social_activity".id = $1 AND user_id = $2;`;
  const sqlValue = [req.params.id, req.user.id];
  pool.query(sqlText, sqlValue)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("err in DELETING router social_activity", err);
      res.sendStatus(500);
    });
});

router.put("/edit/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "social_activity"
    SET "whom"=$1, "score_sa"=$2, "rating"=$3, "description"=$4, "duration"=$5, "online"=$6
    WHERE "social_activity".id = $7 AND user_id = $8;`;
  sqlValue = [
    req.body.whom,
    req.body.score_sa,
    req.body.rating,
    req.body.description,
    req.body.duration,
    req.body.online,
    req.params.id,
    req.user.id,];
  pool.query(sqlText, sqlValue)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in the PUT social_activity router", err);
      res.sendStatus(500);
    });
});

router.put('/increment/', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE balance_score 
  SET "score_sa"=LEAST("score_sa" + $1, 100) WHERE balance_score.date = current_date AND balance_score.user_id = $2`
  const sqlValue = [
    req.body.score_sa,
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
  SET "score_sa"=LEAST("score_sa" - $1, 100) WHERE balance_score.date = current_date AND balance_score.user_id = $2`
  const sqlValue = [
    req.body.score_sa,
    req.user.id]
  pool.query(sqlText, sqlValue)
    .then((result) => {
      res.sendStatus(200)
    }).catch((err) => {
      res.sendStatus(500)
    })
})

module.exports = router;
