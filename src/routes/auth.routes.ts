import express, { Router } from 'express';
import type AuthController from '../controllers/AuthController.ts';
import validationHandler from '../middlewares/ValidationHandler.ts';
import { loginSchema, registerSchema } from '../validation/auth.schema.ts';
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
        router.post('/register', validationHandler(registerSchema), (req, res, next) => this.authController.register(req, res, next));
        router.post('/login', validationHandler(loginSchema), (req, res, next) => this.authController.login(req, res, next));

        return router;
    }
}

export default AuthRouter;