const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  // GET route code here
  const sqlText = `SELECT * FROM sleep;`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in get route sleep", err);
      res.sendStatus(500);
    });
});

// Get by ID route
router.get('/details/:id', rejectUnauthenticated, (req, res)=> {
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


/**
 * POST route template
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  // POST route code here
  const sqlText = `INSERT INTO sleep (user_id, duration, quality, screen_time, start_sleep, end_sleep)
  VALUES ($1, $2, $3, $4, $5, $6);`;
  const sqlValue = [
    req.user.id,
    req.body.duration,
    req.body.quality,
    req.body.screen_time,
    req.body.start_sleep,
    req.body.end_sleep,
  ];
  pool
    .query(sqlText, sqlValue)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in post route sleep", err);
      res.sendStatus(500);
    });
});

router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `DELETE FROM "sleep" WHERE "sleep".id = $1;`;
  const sqlValue = [req.params.id];

  pool
    .query(sqlText, sqlValue)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("err deleting router sleep", err);
      res.sendStatus(500);
    });
});

router.put("/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "sleep"
    SET "duration"=$1, "quality"=$2, "screen_time"=$3, "start_sleep"=$4, "end_sleep"=$5
    WHERE "sleep".id = $6;`;
  sqlValue = [
    req.body.duration,
    req.body.quality,
    req.body.screen_time,
    req.body.start_sleep,
    req.body.end_sleep,
    req.params.id,
  ];

  pool
    .query(sqlText, sqlValue)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in the put sleep router", err);
      res.sendStatus(500);
    });
});

module.exports = router;