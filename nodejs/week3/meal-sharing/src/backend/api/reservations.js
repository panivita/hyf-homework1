const express = require("express");
require("express-async-errors");
const router = express.Router();
const knex = require("../database");

//Returns all reservations
router.get("/", async (req, res) => {
  const allReservations = await knex.select("*").table("reservation");
  res.json(allReservations);
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
  await knex("reservation").insert(newReservation);
  res.send("New reservation added");
});

//Returns reservation by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const reservationById = await knex("reservation").select().where({ id });
  res.json(reservationById);
});

// Updates the reservation by id
router.put("/:id", async (req, res) => {
  const { number_of_guests } = req.body;
  const { id } = req.params;
  await knex("reservation").where({ id }).update({ number_of_guests });
  res.send(`Reservation with id ${id} was updated`);
});

//Deletes the reservation by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await knex("reservation").where({ id }).del();
  res.send(`Reservation with id ${id} was deleted`);
});

router.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

module.exports = router;
