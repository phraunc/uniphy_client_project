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
  const sqlText = `SELECT * FROM movement
  WHERE user_id = $1 ORDER BY id DESC;`;
  pool
    .query(sqlText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in get router movement", err);
      res.sendStatus(500);
    });
});

router.get('/details/:id', rejectUnauthenticated, (req, res)=> {
    const sqlText = `SELECT * FROM movement WHERE movement.id = $1`
    const sqlValue = [req.params.id]
  
    pool.query(sqlText, sqlValue)
    .then((result) => {
      res.send(result.rows)
    })
    .catch((err) => {
      console.log('error in our movement get by id route', err)
      res.sendStatus(500)
    })
  
  })
  

/**
 * POST route template
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  // POST route code here
  const sqlText = `INSERT INTO movement (user_id, score_m, title, duration, intensity, total_points)
  VALUES ($1, $2, $3, $4, $5, $6);`;

  const sqlValue = [
    req.user.id,
    req.body.score_m,
    req.body.title,
    req.body.duration,
    req.body.intensity,
    req.body.total_points
  ];
  pool
    .query(sqlText, sqlValue)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in post router movement", err);
      res.sendStatus(500);
    });
});

router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `DELETE FROM "movement" WHERE "movement".id = $1 AND user_id = $2;`;
  const sqlValue = [req.params.id, req.user.id];

  pool
    .query(sqlText, sqlValue)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("err deleting router movement", err);
      res.sendStatus(500);
    });
});

router.put("/edit/:id", rejectUnauthenticated, (req, res) => {
    
  const sqlText = `UPDATE "movement"
    SET "title"=$1, "duration"=$2, "intensity"=$3
    WHERE "movement".id = $4 AND user_id = $5;`;
  sqlValue = [
    req.body.title,
    req.body.duration,
    req.body.intensity,
    req.params.id,
    req.user.id,
  ];
 
  pool
    .query(sqlText, sqlValue)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error in the put movement router", err);
      res.sendStatus(500);
    });
});

router.put('/increment/', rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE balance_score 
  SET "score_m"=LEAST("score_m" + $1, 100) WHERE balance_score.date = current_date AND balance_score.user_id = $2`
  const sqlValue = [
     req.body.score_m,
    req.user.id
  ]

  pool.query(sqlText, sqlValue)
  .then((result) => {
    res.sendStatus(200)
  }).catch((err) => {
    res.sendStatus(500)
  })

})

router.put('/decrement/', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE balance_score 
    SET "score_m"=LEAST("score_m" - $1, 100) WHERE balance_score.date = current_date AND balance_score.user_id = $2`
    const sqlValue = [
       req.body.score_m,
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