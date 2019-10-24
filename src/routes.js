import { Router } from 'express';
const routes = new Router();

import UserController from './app/controllers/UserController';
import PostController from './app/controllers/PostController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Private routes
routes.use(authMiddleware);

routes.get('/posts', PostController.index);
routes.get('/posts/:id', PostController.retrieve);
routes.post('/posts', PostController.store);
routes.put('/posts/:id', PostController.update);
routes.delete('/posts/:id', PostController.delete);

export default routes;
