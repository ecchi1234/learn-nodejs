const express = require('express');
const fs = require('fs');

const app = express();

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello from server!' });
// });

// app.post("/", (req, res) => {
//     res.send("You can post to this end point");
// })
const port = 3000;

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
