import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDatabase from './config/database';
import routes from './routes';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(cors());
app.use(express.json());
app.use(routes);

connectToDatabase();

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening on port ${port}`);
});
