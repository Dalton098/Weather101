
import express from 'express';
import dotenv from 'dotenv';
import proxy from 'express-http-proxy';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT;

const angularPath = (__dirname.endsWith("dist") ? '/../../' : '/../') + 'frontend/Weather101/dist/weather101/browser/';

app.use('/weather', proxy('https://api.weather.gov'));

app.use(express.static(__dirname + angularPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + angularPath + "index.html"));
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});