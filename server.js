const express = require('express');
const path = require('path');
// Helper method for generating unique ids
const uuid = require('./helpers/uuid');
const data = require('./db/db.json');
const fs = require('fs')

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    res.json(JSON.parse(data))
  })
});

app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      res.json(err)
      return 
    } 
      const parsedNotes = JSON.parse(data);

      const {title, text} = req.body;

      const newNote = {
          title,
          text,
          id: uuid(),
      };
      parsedNotes.push(newNote);

      const newNoteArray = JSON.stringify(parsedNotes, null, 4);

      fs.writeFile('./db/db.json', newNoteArray, 'utf8', (err) => 
          err ? res.json(err) : 
          res.send('success')
      );

})

})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
