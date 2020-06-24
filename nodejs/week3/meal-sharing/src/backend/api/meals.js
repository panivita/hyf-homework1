const express = require("express");
require("express-async-errors");
const router = express.Router();
const knex = require("../database");

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

  await knex("meal").insert(newMeal);
  res.send("New meal added");
});

//Returns meal by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const mealById = await knex("meal").select().where({ id });
  res.json(mealById);
});

// Updates the meal by id
router.put("/:id", async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  await knex("meal").where({ id }).update({ title });
  res.send(`Meal with id ${id} was updated`);
});

//Deletes the meal by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await knex("meal").where({ id }).del();
  res.send(`Meal with id ${id} was deleted`);
});

//Returns all meals
//Get meals that has a price smaller than maxPrice
//Get meals that still has available reservations
//Get meals that partially match a title.
//Get meals that has been created after the date
//Only specific number of meals

router.get("/", async (req, res) => {
  const {
    maxPrice,
    availableReservations,
    title,
    createdAfter,
    limit,
  } = req.query;
  let meals = await knex("meal").select("*");

  if (maxPrice) {
    const numMaxPrice = parseInt(maxPrice);
    meals = await knex("meal").select("*").where("price", "<", numMaxPrice);
  }

  if (availableReservations === "true") {
    meals = await knex("meal")
      .select("*")
      .sum({ total: "reservation.number_of_guests" })
      .join("reservation", { "meal.id": "reservation.meal_id" })
      .where("meal.meal_time", ">=", knex.fn.now())
      .groupBy("meal.id")
      .orderBy("meal.title", "asc")
      .having("total", ">", "meal.max_reservations");
  }

  if (title) {
    meals = await knex("meal").select("*").where("title", "like", `%${title}%`);
  }

  if (createdAfter) {
    const dateCreatedAfter = new Date(createdAfter);
    meals = await knex("meal")
      .select("*")
      .where("created_date", ">", dateCreatedAfter);
  }

  if (limit) {
    const numMealLimit = parseInt(limit);
    meals = await knex("meal").select("*").limit(numMealLimit);
  }

  if (meals.length === 0 || availableReservations === "false") {
    res.status(404).send(`404 Error. Meal is not found`);
  }

  res.json(meals);
});

router.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

module.exports = router;
