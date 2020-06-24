const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// calculator will support 4 features: addition, subtraction, multiplication, division
const calculate = (otherNumbers, operator, initualNumber) => {
  return otherNumbers.reduce((x, y) => {
    switch (operator) {
      case "add":
        return x + y;
      case "subtract":
        return x - y;
      case "multiply":
        return x * y;
      case "divide":
        return x / y;
    }
  }, initualNumber);
};

const getArrSecondParam = (number) => Object.values(number).map(Number);

// Calculator using :method (path) parameter
app.get("/calculator/:method", (req, res) => {
  const { firstParam, secondParam } = req.query;
  const { method } = req.params;

  const arrNumb = getArrSecondParam(secondParam);

  const firstNumber = parseInt(firstParam);
  const resultCalculation = calculate(arrNumb, method, firstNumber);

  if (method) {
    res.send(`${firstParam} ${method} ${arrNumb.join(' and ')} is equal to ${resultCalculation}`);
  } else {
    res.send(
      "Error. First specify numbers and parameters to url, e.g. /calculator/multiply?firstParam=2&secondParam=2"
    );
  }
});

// Calculator using req.body
app.post("/calculator", (req, res) => {
  const { method } = req.body;
  const { firstParam, secondParam } = req.query;

  const arrNumb = getArrSecondParam(secondParam);

  const firstNumber = parseInt(firstParam);
  const resultCalculation = calculate(arrNumb, method, firstNumber);

  if (method) {
    res.send(`${resultCalculation}`);
  } else {
    res.send(
      "Error. First specify numbers to url, e.g. /calculator/firstParam=2&secondParam=2"
    );
  }
});

app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);
