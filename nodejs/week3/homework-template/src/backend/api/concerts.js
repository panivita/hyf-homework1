const express = require("express");
const app = express();
const router = express.Router();
const knex = require("../database");



router.post('/', async function (req, res) {
  console.log(req.body);
  const newConcerts = {
     title : req.query.title,
     band : req.query.band,
     venue : req.query.venue,
     createdDate: req.query.createdDate,
     performanceDate: req.query.performanceDate,
     price: req.query.price
  }
  await knex("concerts").insert(newConcerts);
  res.send('hello concerts post');
});
   
  





module.exports = router;
