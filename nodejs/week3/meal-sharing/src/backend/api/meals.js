const express = require("express");
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
  let meals = await knex.select("*").table("meal");

  if (maxPrice) {
    const numMaxPrice = parseInt(maxPrice);
    meals = await knex("meal").select().where("price", "<", numMaxPrice);
  }
  if (availableReservations === true) {
    meals = await knex
      .from("meal")
      .select("*")
      .sum({ total: "reservation.number_of_guests" })
      .join("reservation", { "meal.id": "reservation.meal_id" })
      .where("meal.meal_time", "<", knex.fn.now())
      .groupBy("meal.id")
      .having(sum(total), "<", "meal.max_reservations");
  }

  if (title) {
    meals = await knex("meal").where("title", "like", `%${title}%`);
  }

  if (createdAfter) {
    const dateCreatedAfter = new Date(createdAfter);
    meals = await knex("meal")
      .select()
      .where("created_date", ">", dateCreatedAfter);
  }

  if (limit) {
    const numMealLimit = parseInt(limit);
    meals = await knex.select().from("meal").limit(numMealLimit);
  }

  if (meals.length === 0) {
    res.status(404).send(`404 Error. Meal is not found`);
  }
  res.json(meals);
});

module.exports = router;
