import type { DatabaseSync } from 'node:sqlite';
import express, { Router, type Request, type Response } from 'express';

import AuthRouter from './auth.routes.ts';

class AppRouter
{
    private db: DatabaseSync;

    constructor(database: DatabaseSync)
    {
        this.db = database;
    }

    initialize(): Router
    {
        const router = express.Router();

        // Rota de Teste
        router.get('/', (req: Request, res: Response) => {
            res.send("Hello, world!");
        });

        // Rotas de Auth
        router.use(new AuthRouter(this.db).initialize());

        return router;
    }
}

export default AppRouter;