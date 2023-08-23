const express = require('express');
const path = require('path');
// Helper method for generating unique ids
/* const uuid = require('./helpers/uuid');
 */const data = require('./db/db.json');
const fs = require('fs')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/', (req, res) => {
  res.status(200).json(data);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
