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
  const sqlText = `SELECT * FROM work_school
  WHERE user_id = $1;`;
  pool
    .query(sqlText, [req.user.id])
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


/**
 * POST route template
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  // POST route code here
  const sqlText = `INSERT INTO work_school (user_id, note, workload, fullfillment)
  VALUES ($1, $2, $3, $4);`;
  const sqlValue = [
    req.user.id,
    req.body.note,
    req.body.workload,
    req.body.fullfillment
  ];
  pool
    .query(sqlText, sqlValue)
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

  pool
    .query(sqlText, sqlValue)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in DELETE work_school Route", err);
      res.sendStatus(500);
    });
});

router.put("/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "work_school"
    SET "note"=$1, "workload"=$2, "fullfillment"=$3
    WHERE "work_school".id = $4 AND user_id = $5;`;
  sqlValue = [
    req.body.note,
    req.body.workload,
    req.body.fullfillment,
    req.params.id,
    req.user.id,
  ];
  pool
    .query(sqlText, sqlValue)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in PUT work_school Route", err);
      res.sendStatus(500);
    });
});

module.exports = router;
