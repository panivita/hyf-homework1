const express = require("express");
require("express-async-errors");
const router = express.Router();
const knex = require("../database");

//Returns all reviews
router.get("/", async (req, res) => {
  const allReviews = await knex.select("*").table("review");
  res.json(allReviews);
});

//Adds a new review
router.post("/", async (req, res) => {
  const { id, title, description, meal_id, stars, created_date } = req.body;
  const newReview = { id, title, description, meal_id, stars, created_date };
  await knex("review").insert(newReview);
  res.send("New review added");
});

//Returns review by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const reviewById = await knex("review").select().where({ id });
  res.json(reviewById);
});

// Updates the review by id
router.put("/:id", async (req, res) => {
  const { stars } = req.body;
  const { id } = req.params;
  await knex("review").where({ id }).update({ stars });
  res.send(`Review with id ${id} was updated`);
});

//Deletes the review by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await knex("review").where({ id }).del();
  res.send(`Review with id ${id} was deleted`);
});

router.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

module.exports = router;
