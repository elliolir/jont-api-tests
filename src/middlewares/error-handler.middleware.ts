import {ErrorRequestHandler} from "express";
import { EntityNotFoundError } from 'typeorm';


export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof EntityNotFoundError) {
    res.status(404).json({message: err.message});
  } else {
    res.status(500).json({message: 'Internal Server Error'});
  }
}