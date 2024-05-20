const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: `./config.env` });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('DB connect successfully!');
  });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

// IMPORT ALL DATA

const importData = async () => {
  try {
    await Tour.create(tours);
    // eslint-disable-next-line no-console
    console.log('Data successfully loaded!');
    process.exit();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

// DELETE ALL DATA
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    // eslint-disable-next-line no-console
    console.log('Data successfully deleted!');
    process.exit();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
