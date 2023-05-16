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
  const sqlText = `SELECT * FROM occupation;`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in GET Occupation Route", err);
      res.sendStatus(500);
    });
});

// Get by ID route
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM occupation WHERE occupation.id = $1`
  const sqlValue = [req.params.id]

  pool.query(sqlText, sqlValue)
    .then((result) => {
      res.send(result.rows)
    })
    .catch((err) => {
      console.log('error in GET by ID Occupation Route', err)
      res.sendStatus(500)
    })

})


/**
 * POST route template
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  // POST route code here
  const sqlText = `INSERT INTO occupation (user_id, title, duration, description)
  VALUES ($1, $2, $3, $4);`;
  const sqlValue = [
    req.user.id,
    req.body.title,
    req.body.duration,
    req.body.description
  ];
  pool
    .query(sqlText, sqlValue)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in POST Occupation Route", err);
      res.sendStatus(500);
    });
});

router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `DELETE FROM "occupation" WHERE "occupation".id = $1;`;
  const sqlValue = [req.params.id];

  pool
    .query(sqlText, sqlValue)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in DELETE Occupation Route", err);
      res.sendStatus(500);
    });
});

router.put("/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "occupation"
    SET "title"=$1, "duration"=$2, "description"=$3
    WHERE "occupation".id = $4;`;
  sqlValue = [
    req.body.title,
    req.body.duration,
    req.body.description,
    req.params.id,
  ];
  pool
    .query(sqlText, sqlValue)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in PUT Occupation Route", err);
      res.sendStatus(500);
    });
});

module.exports = router;
