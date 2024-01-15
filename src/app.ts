import "reflect-metadata";
import express from 'express';

import {todosRouter} from "@/routes/todos/todos.route";

export const app = express();

app.use(todosRouter);