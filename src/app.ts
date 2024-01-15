import "reflect-metadata";
import 'express-async-errors';
import bodyParser from 'body-parser';
import express from 'express';

import {todosRouter} from "@/routes/todos.route";
import {errorHandlerMiddleware} from "@/middlewares/error-handler.middleware";

export const app = express();

app.use(bodyParser.json({ limit: '50mb' }));

app.use(todosRouter);

app.use(errorHandlerMiddleware)