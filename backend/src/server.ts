import express from 'express';
import cors from 'cors'
import 'express-async-errors'
import { join } from 'path'

import errorHandler from './errors/handler';
import routes from './routes';

import './database/connection';

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler)
app.use(cors())
app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))

app.listen(3333) 