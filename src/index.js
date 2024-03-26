import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import ErrorHandler from './middleware/errorHandler.middleware';
import routes from './routes';

const app = express();
dotenv.config();
const { PORT } = process.env;

app.use(cors());
app.use(bodyParser.json());

app.use('/', routes);
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log('server running on', PORT);
});
