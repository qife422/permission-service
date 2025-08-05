const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

let currentChoice = null;

app.get('/permission', (req, res) => {
  if (currentChoice === null) {
    return res.sendStatus(204);
  }
  res.json({ choice: currentChoice });
});

app.post('/permission', (req, res) => {
  const { choice } = req.body;
  if (!choice) {
    return res.status(400).json({ error: 'Missing choice field' });
  }
  currentChoice = choice;
  res.json({ choice: currentChoice });
});

app.use(express.static(__dirname));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Permission service running on http://localhost:${PORT}`);
});
