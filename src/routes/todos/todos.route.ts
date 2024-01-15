import { Router } from 'express';

import {Todo} from '@/entities/Todo';
import dataSource from "@/data-source";

const todoRepository = dataSource.getRepository(Todo);

export const todosRouter = Router();

todosRouter.get('/todos', async (req, res) => {
  const todos = await todoRepository.find();
  res.status(200).send(todos)
})

todosRouter.get('/todos/:id', async (req, res) => {
  const id = +req.params.id;
  const todo = await todoRepository.findOneByOrFail({id});

  res.status(200).send(todo);
})

todosRouter.post('/todos', async (req, res) => {
  const {value} = req.body;
  const todo = await todoRepository.create({value});
  const savedTodo = await todoRepository.save(todo);

  res.status(200).send(savedTodo);
})

todosRouter.patch('/todos/:id', async (req, res) => {
  const {value} = req.body;
  const id = +req.params.id;

  const todo = await todoRepository.findOneByOrFail({id});

  todo.value = value;
  const updatedTodo = await todoRepository.save(todo)

  res.status(200).send(updatedTodo);
})