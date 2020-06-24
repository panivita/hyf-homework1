const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const port = process.env.PORT || 3000;

const mealsRouter = require("./api/meals");
const reservationsRouter = require("./api/reservations");
const reviewsRouter = require("./api/reviews");

// For week4 no need to look into this!
// Serve the built client html
const buildPath = path.join(__dirname, "./../frontend");
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

router.use("/meals", mealsRouter);
router.use("/reservations", reservationsRouter);
router.use("/reviews", reviewsRouter);

app.use("/api", router);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./../frontend/index.html"));
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
