
import express from 'express';
import dotenv from 'dotenv';
import proxy from 'express-http-proxy';

dotenv.config();

const app = express();
const port = process.env.PORT;

const angularPath = (__dirname.endsWith("dist") ? '/../../' : '/../') + 'frontend/Weather101/dist/weather101/browser/';

app.use('/weather', proxy('https://api.weather.gov'));

app.use('/', express.static(__dirname + angularPath));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});