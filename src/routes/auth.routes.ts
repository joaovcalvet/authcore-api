import express, { Router } from 'express';
import type AuthController from '../controllers/AuthController.ts';
class AuthRouter
{
    private authController: AuthController;

    constructor(controller: AuthController)
    {
        this.authController = controller;
    }

    public initialize(): Router
    {
        const router = express.Router();

        router.use(express.json());

        // Rotas /auth
        router.post('/register', (req, res) => this.authController.register(req, res));
        router.post('/login', (req, res) => this.authController.login(req, res));

        return router;
    }
}

export default AuthRouter;