import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDatabase from './config/database';
import routes from './routes';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);

// Construir la URL pública para Codespaces cuando corresponda,
// usando explícitamente process.env.CODESPACE_NAME
const codespaceName = process.env.CODESPACE_NAME;
const publicUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());
app.use(routes);

connectToDatabase();

// Bind explícito a 0.0.0.0 para que sea accesible desde Codespaces
app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit Tracker backend listening on port ${port}`);
  console.log(`API base URL: ${publicUrl}`);
});
