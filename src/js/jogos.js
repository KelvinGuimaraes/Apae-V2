const express = require('express');
const app = express();
const path = require('path');

// Serve static files from 'src/jogos'
app.use(express.static(path.join(__dirname, 'src', 'jogos')));

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
