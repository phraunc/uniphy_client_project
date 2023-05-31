const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

router.get("/", rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM work_school
  WHERE user_id = $1 ORDER BY id DESC;`;
  pool.query(sqlText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in GET work_school Route", err);
      res.sendStatus(500);
    });
});

// Get by ID route
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM work_school WHERE work_school.id = $1`
  const sqlValue = [req.params.id]
  pool.query(sqlText, sqlValue)
    .then((result) => {
      res.send(result.rows)
    })
    .catch((err) => {
      console.log('error in GET by ID work_school Route', err)
      res.sendStatus(500)
    })
})

router.post("/", rejectUnauthenticated, (req, res) => {
  const sqlText = `INSERT INTO work_school (user_id, score_w, note, workload, fullfillment, total_points)
  VALUES ($1, $2, $3, $4, $5, $6);`;
  const sqlValue = [
    req.user.id,
    req.body.score_w,
    req.body.note,
    req.body.workload,
    req.body.fullfillment,
    req.body.total_points];
  pool.query(sqlText, sqlValue)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in POST work_school Route", err);
      res.sendStatus(500);
    });
});

router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `DELETE FROM "work_school" WHERE "work_school".id = $1 AND user_id = $2;`;
  const sqlValue = [req.params.id, req.user.id];
  pool.query(sqlText, sqlValue)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in DELETE work_school Route", err);
      res.sendStatus(500);
    });
});

router.put("/edit/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "work_school"
    SET "score_w"=$1, "note"=$2, "workload"=$3, "fullfillment"=$4
    WHERE "work_school".id = $5 AND user_id = $6;`;
  sqlValue = [
    req.body.score_w,
    req.body.note,
    req.body.workload,
    req.body.fullfillment,
    req.params.id,
    req.user.id,];
  pool.query(sqlText, sqlValue)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in PUT work_school Route", err);
      res.sendStatus(500);
    });
});

router.put('/increment/', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE balance_score 
  SET "score_w"=LEAST("score_w" + $1, 100) WHERE balance_score.date = current_date AND balance_score.user_id = $2`
  const sqlValue = [
    req.body.score_w,
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
  SET "score_w"=LEAST("score_w" - $1, 100) WHERE balance_score.date = current_date AND balance_score.user_id = $2`
  const sqlValue = [
    req.body.score_w,
    req.user.id]
  pool.query(sqlText, sqlValue)
    .then((result) => {
      res.sendStatus(200)
    }).catch((err) => {
      res.sendStatus(500)
    })
})

module.exports = router;
