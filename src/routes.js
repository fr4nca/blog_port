import { Router } from 'express';
const routes = new Router();

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import PostController from './app/controllers/PostController';
import SessionController from './app/controllers/SessionController';
import SkillController from './app/controllers/SkillController';
import SkillAreaController from './app/controllers/SkillAreaController';

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Private routes
routes.use(authMiddleware);

routes.get('/posts', PostController.index);
routes.get('/posts/:id', PostController.retrieve);
routes.post('/posts', PostController.store);
routes.put('/posts/:id', PostController.update);
routes.delete('/posts/:id', PostController.delete);

routes.get('/skillareas', SkillAreaController.index);
routes.post('/skillareas', SkillAreaController.create);
routes.put('/skillareas/:id', SkillAreaController.update);

routes.get('/skills', SkillController.index);

export default routes;
