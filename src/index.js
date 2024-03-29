import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import ErrorHandler from './middleware/errorHandler.middleware';
import routes from './routes';

const app = express();
dotenv.config();
const { PORT } = process.env;

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log('server running on', PORT);
});
