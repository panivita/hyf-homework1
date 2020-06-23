const express = require("express");
const app = express();
const router = express.Router();
const knex = require("../database");

//Returns all meals
router.get("/", async (request, response) => {
  try {
    const allMeals = await knex.select("*").table("meal");
    response.json(allMeals);
  } catch (error) {
    throw error;
  }
});

//Adds a new meal
router.post("/", async (req, res) => {
  const {
    id,
    title,
    description,
    location,
    meal_time,
    max_reservations,
    price,
    created_date,
  } = req.body;

  const newMeal = {
    id,
    title,
    description,
    location,
    meal_time,
    max_reservations,
    price,
    created_date,
  };
  try {
    await knex("meal").insert(newMeal);
    res.send("New meal added");
  } catch (error) {
    res.send("Error: " + error);
  }
});

//Returns meal by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const mealById = await knex("meal").select().where({ id });
    res.json(mealById);
  } catch (error) {
    throw error;
  }
});

// Updates the meal by id
router.put("/:id", async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  try {
    await knex("meal").where({ id }).update({ title });
    res.send(`Meal with id ${id} was updated`);
  } catch (error) {
    res.send("Error: " + error);
  }
});

//Deletes the meal by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await knex("meal").where({ id }).del();
    res.send(`Meal with id ${id} was deleted`);
  } catch (error) {
    res.send("Error: " + error);
  }
});

module.exports = router;
