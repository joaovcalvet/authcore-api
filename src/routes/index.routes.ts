import express, { Router, type Request, type Response } from 'express';

import AuthRouter from './auth.routes.ts';
import UserRouter from './user.routes.ts';

import type BaseController from '../controllers/BaseController.ts';

class AppRouter
{
    private baseCtrl: BaseController;

    constructor(controller: BaseController)
    {
        this.baseCtrl = controller;
    }

    initialize(): Router
    {
        const router = express.Router();

        // Rota de Teste
        router.get('/', (req: Request, res: Response) => {
            res.send("Hello, world!");
        });

        // Rotas de Auth
        router.use('/auth', new AuthRouter(this.baseCtrl.authController).initialize());

        // Rotas de User
        router.use('/user', new UserRouter(this.baseCtrl.userController).initialize());

        return router;
    }
}

export default AppRouter;