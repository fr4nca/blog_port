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

routes.post('/posts', PostController.store);

export default routes;
