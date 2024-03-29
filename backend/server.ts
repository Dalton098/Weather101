
import express from 'express';
import dotenv from 'dotenv';
import proxy from 'express-http-proxy';
import path from 'path';
import { codes } from './zipcodes/codes';
const typeErasedCodes = codes as any;
dotenv.config();

const app = express();
const port = process.env.PORT;

const angularPath = (__dirname.endsWith("dist") ? '/../../' : '/../') + 'frontend/Weather101/dist/weather101/browser/';

app.use('/weather', proxy('https://api.weather.gov'));
app.use('/mesonet', proxy('https://mesonet.agron.iastate.edu'));
app.get('/zipcode/:zipCode', (req, res) => {
  const zip = req.params.zipCode;
  console.log('Performing lookup for ' + zip);
  const result = typeErasedCodes[`${zip}`];
  if (result != undefined) {
    console.log('found', result);
    return res.json(result)
  }
  res.sendStatus(404);
});

app.use(express.static(__dirname + angularPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + angularPath + "index.html"));
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});