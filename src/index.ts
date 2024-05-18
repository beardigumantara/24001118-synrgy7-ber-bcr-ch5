import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import carsRouter from './routes/car.routes';
import knex from 'knex';
import { Model } from 'objection';


const port = 8000;
const app = express();

const knexInstance = knex({
  client: "postgresql",
  connection: {
    database: "postgres",
    user: "postgres",
    password: "123456", 
    port: 5432
  }
});

Model.knex(knexInstance);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    message : 'Hello World!'});
});

app.use('/cars', carsRouter);
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`API Ruuning on port ${port}`);
});