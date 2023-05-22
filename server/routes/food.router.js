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
  const sqlText = `SELECT * FROM food
  WHERE user_id = $1 ORDER BY id DESC;`;
  pool
    .query(sqlText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in get rout food", err);
      res.sendStatus(500);
    });
});

// Get by ID route
router.get('/details/:id', rejectUnauthenticated, (req, res)=> {
  const sqlText = `SELECT * FROM food WHERE food.id = $1`
  const sqlValue = [req.params.id]

  pool.query(sqlText, sqlValue)
  .then((result) => {
    res.send(result.rows)
  })
  .catch((err) => {
    console.log('error in our food get by id route', err)
    res.sendStatus(500)
  })

})


/**
 * POST route template
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  // POST route code here
  const sqlText = `INSERT INTO food (user_id, score_f, quality, quantity, snack, water, fasting, total_points)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
  const sqlValue = [
    req.user.id,
    req.body.score_f,
    req.body.quality,
    req.body.quantity,
    req.body.snack,
    req.body.water,
    req.body.fasting,
    req.body.total_points
  ];
  pool
    .query(sqlText, sqlValue)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in post rout food", err);
      res.sendStatus(500);
    });
});

router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `DELETE FROM "food" WHERE "food".id = $1 AND user_id = $2;`;
  const sqlValue = [req.params.id, req.user.id];

  pool
    .query(sqlText, sqlValue)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("err deleting router food", err);
      res.sendStatus(500);
    });
});

router.put("/edit/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "food"
    SET "quality"=$1, "quantity"=$2, "snack"=$3, "water"=$4, "fasting"=$5
    WHERE "food".id = $6 AND user_id=$7;`;
  sqlValue = [
    req.body.quality,
    req.body.quantity,
    req.body.snack,
    req.body.water,
    req.body.fasting,
    req.params.id,
    req.user.id,
  ];

  pool
    .query(sqlText, sqlValue)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in the put food router", err);
      res.sendStatus(500);
    });
});

router.put('/update/', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE balance_score 
  SET "score_f"= LEAST("score_f" + $1, 100) WHERE balance_score.date = current_date AND balance_score.user_id = $2;`
  const sqlValue = [
     req.body.score_f,
    req.user.id
  ]

  pool.query(sqlText, sqlValue)
  .then((result) => {
    res.sendStatus(200)
  }).catch((err) => {
    res.sendStatus(500)
  })

})


module.exports = router;