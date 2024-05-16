import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';


const port = 8000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    message : 'Hello World!'});
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`API Ruuning on port ${port}`);
});