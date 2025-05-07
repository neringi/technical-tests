// const functions = require('@google-cloud/functions-framework');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Ensure JSON body parsing

app.all('/', (req, res) => {
  if (req.method === 'GET') {
    // Return documentation
    res.json({
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
    });
  } else if (req.method === 'POST') {
    try {
      console.log("Received body:", JSON.stringify(req.body));

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
  } else {
    res.status(405).send('Method Not Allowed');
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// functions.http('rollDice', app);
