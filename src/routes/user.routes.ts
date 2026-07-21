import express from "express";
import type { NextFunction, Request, Response, Router } from "express";

import type UserController from "../controllers/UserController.ts";

class UserRouter
{
    private userCtrl: UserController;

    constructor(userController: UserController)
    {
        this.userCtrl = userController;
        this.initialize();
    }

    public initialize(): Router
    {
        const router = express.Router();

        router.use(express.json());

        router.get('/me', (req: Request, res: Response) => this.userCtrl.me(req, res));

        return router;
    }
}

export default UserRouter;