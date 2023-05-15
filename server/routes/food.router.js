const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  // GET route code here
  const sqlText = `SELECT * FROM food;`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in get rout food", err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
  const sqlText= `INSERT INTO food (user_id, quality, quantity, snack, water, fasting)
  VALUES ($1, $2, $3, $4, $5, $6);`
  const sqlValue = [req.user.id, req.body.quality, req.body.quantity,req.body.snack, req.body.water, req.body.fasting];
  pool.query(sqlText, sqlValue)
  .then((result)=>{
    res.sendStatus(200)
  }).catch((err)=>{
    console.log('error in post rout food', err)
    res.sendStatus(500)
  })
  
});

module.exports = router;
