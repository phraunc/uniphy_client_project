
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
  const sqlText = `SELECT * FROM social_activity;`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in GET route social_activity", err);
      res.sendStatus(500);
    });
});

// Get by ID route
router.get('/details/:id', rejectUnauthenticated, (req, res)=> {
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


/**
 * POST route template
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  // POST route code here
  const sqlText = `INSERT INTO social_activity (user_id, whom, description, duration, online)
  VALUES ($1, $2, $3, $4, $5);`;
  const sqlValue = [
    req.user.id,
    req.body.whom,
    req.body.description,
    req.body.duration,
    req.body.online,
  ];
  pool
    .query(sqlText, sqlValue)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in POST route social_activity", err);
      res.sendStatus(500);
    });
});

router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `DELETE FROM "social_activity" WHERE "social_activity".id = $1;`;
  const sqlValue = [req.params.id];

  pool
    .query(sqlText, sqlValue)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("err in DELETING router social_activity", err);
      res.sendStatus(500);
    });
});

router.put("/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "social_activity"
    SET "whom"=$1, "description"=$2, "duration"=$3, "online"=$4
    WHERE "social_activity".id = $5;`;
  sqlValue = [
    req.body.whom,
    req.body.description,
    req.body.duration,
    req.body.online,
    req.params.id,
  ];

  pool
    .query(sqlText, sqlValue)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in the PUT socail_activity router", err);
      res.sendStatus(500);
    });
});

module.exports = router;
