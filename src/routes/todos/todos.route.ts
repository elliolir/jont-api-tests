import { Router } from 'express';

export const todosRouter = Router();

todosRouter.get('/todos', (req, res) => {
  res.status(200).send({id: 1, value: 'hello'})
})