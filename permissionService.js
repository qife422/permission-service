// permissionService.js
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

let currentChoice = null;

// GET /permission
app.get('/permission', (req, res) => {
  if (currentChoice === null) {
    return res.sendStatus(204);
  }
  res.json({ choice: currentChoice });
});

// POST /permission
app.post('/permission', (req, res) => {
  const { choice } = req.body;
  if (!choice) {
    return res.status(400).json({ error: 'Missing choice field' });
  }
  currentChoice = choice;
  res.json({ choice: currentChoice });
});

// —— 把根目录当成静态资源目录 ——
// 这样就可以直接在根目录放 index.html 并访问 http://localhost:3000/
app.use(express.static(__dirname));

// 或者，你也可以显式地写一条根路由：
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Permission service running on http://localhost:${PORT}`);
});
