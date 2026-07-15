import express, { Router, type Response } from 'express';

import AuthRouter from './auth.routes.ts';
import type BaseController from '../controllers/BaseController.ts';

class AppRouter
{
    private baseController: BaseController;

    constructor(controller: BaseController)
    {
        this.baseController = controller;
    }

    initialize(): Router
    {
        const router = express.Router();

        // Rota de Teste
        router.get('/', (res: Response) => {
            res.send("Hello, world!");
        });

        // Rotas de Auth
        router.use(new AuthRouter(this.baseController.authController).initialize());

        return router;
    }
}

export default AppRouter;