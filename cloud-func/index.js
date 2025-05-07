const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); 

const docs = {
  name: "rollDice",
  description: "Roll a dice with a customizable size (defaults to 20-sided).",
  input: {
    type: "object",
    description: "Input must be under the 'input' key. diceSize is any positive integer.",
    example: { diceSize: 6 }
  },
  output: {
    type: "object",
    description: "The result of the dice roll.",
    example: { output: { diceSize: 6, result: 4 } }
  }
};

app.get('/', (req, res) => {
  res.json(docs);
})

app.post('/', (req, res) => {
  try {
    const diceSizeRaw = req.body?.input?.diceSize; 
    const parsedSize = parseInt(diceSizeRaw, 10);
    const size = Number.isInteger(parsedSize) && parsedSize > 0 ? parsedSize : 20;
    const result = Math.floor(Math.random() * size) + 1;

    res.json({
      output: {
        diceSize: size,
        result: result
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})