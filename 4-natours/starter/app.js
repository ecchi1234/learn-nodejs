const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from middleware!!');
  next();
});

app.use((req, res, next) => {
  const requestTime = new Date().toISOString();

  req.requestTime = requestTime;
  next();
});

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

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      result: 'fail',
      message: 'Invalid Id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  // we don't implement logic of updated data here
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  // we don't implement logic of updated data here
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }
  // status 204 mean no data return
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// app.get('/api/v1/tours', getAllTours);

// app.get('/api/v1/tours/:id', getTour);

// app.post('/api/v1/tours', createTour);

// app.patch('/api/v1/tours/:id', updateTour);

// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
