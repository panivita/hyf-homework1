const express = require("express");
const router = express.Router();
const knex = require("../database");

//Returns all reviews
router.get("/", async (req, res) => {
  try {
    const allReviews = await knex.select("*").table("review");
    res.json(allReviews);
  } catch (error) {
    res.send("Error: " + error);
  }
});

//Adds a new review
router.post("/", async (req, res) => {
  const { id, title, description, meal_id, stars, created_date } = req.body;

  const newReview = { id, title, description, meal_id, stars, created_date };
  try {
    await knex("review").insert(newReview);
    res.send("New review added");
  } catch (error) {
    res.send("Error: " + error);
  }
});

//Returns review by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const reviewById = await knex("review").select().where({ id });
    res.json(reviewById);
  } catch (error) {
    throw error;
  }
});

// Updates the review by id
router.put("/:id", async (req, res) => {
  const { stars } = req.body;
  const { id } = req.params;
  try {
    await knex("review").where({ id }).update({ stars });
    res.send(`Review with id ${id} was updated`);
  } catch (error) {
    res.send("Error: " + error);
  }
});

//Deletes the review by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await knex("review").where({ id }).del();
    res.send(`Review with id ${id} was deleted`);
  } catch (error) {
    res.send("Error: " + error);
  }
});

module.exports = router;
