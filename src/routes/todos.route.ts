import {Router} from 'express';

import {Todo} from '@/entities/Todo';
import {mainDataSource} from "@/data-source";

export const todosRouter = Router();

todosRouter.get('/todos', async (req, res) => {
  const todoRepository = mainDataSource.instance.getRepository(Todo);
  const todos = await todoRepository.find();
  res.status(200).send(todos)
})

todosRouter.get('/todos/:id', async (req, res) => {
  const id = +req.params.id;
  const todoRepository = mainDataSource.instance.getRepository(Todo);
  const todo = await todoRepository.findOneByOrFail({id});

  res.status(200).send(todo);
})

todosRouter.post('/todos', async (req, res) => {
  const {value} = req.body;
  const todoRepository = mainDataSource.instance.getRepository(Todo);
  const todo = await todoRepository.create({value});
  const savedTodo = await todoRepository.save(todo);

  res.status(201).send(savedTodo);
})

todosRouter.patch('/todos/:id', async (req, res) => {
  const {value} = req.body;
  const id = +req.params.id;

  const todoRepository = mainDataSource.instance.getRepository(Todo);
  const todo = await todoRepository.findOneByOrFail({id});

  todo.value = value;
  const updatedTodo = await todoRepository.save(todo)

  res.status(200).send(updatedTodo);
})