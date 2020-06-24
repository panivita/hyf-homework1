const express = require("express");
const router = express.Router();
const knex = require("../database");

//Returns all reservations
router.get("/", async (req, res) => {
  try {
    const allReservations = await knex.select("*").table("reservation");
    res.json(allReservations);
  } catch (error) {
    throw error;
  }
});

//Adds a new reservation
router.post("/", async (req, res) => {
  const { id, number_of_guests, meal_id, created_date } = req.body;

  const newReservation = {
    id,
    number_of_guests,
    meal_id,
    created_date,
  };
  try {
    await knex("reservation").insert(newReservation);
    res.send("New reservation added");
  } catch (error) {
    res.send("Error: " + error);
  }
});

//Returns reservation by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const reservationById = await knex("reservation").select().where({ id });
    res.json(reservationById);
  } catch (error) {
    throw error;
  }
});

// Updates the reservation by id
router.put("/:id", async (req, res) => {
  const { number_of_guests } = req.body;
  const { id } = req.params;
  try {
    await knex("reservation").where({ id }).update({ number_of_guests });
    res.send(`Reservation with id ${id} was updated`);
  } catch (error) {
    res.send("Error: " + error);
  }
});

//Deletes the reservation by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await knex("reservation").where({ id }).del();
    res.send(`Reservation with id ${id} was deleted`);
  } catch (error) {
    res.send("Error: " + error);
  }
});

module.exports = router;
