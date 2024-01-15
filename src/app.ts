import "reflect-metadata";
import bodyParser from 'body-parser';
import express from 'express';

import {todosRouter} from "@/routes/todos/todos.route";

export const app = express();

app.use(bodyParser.json({ limit: '50mb' }));

app.use(todosRouter);