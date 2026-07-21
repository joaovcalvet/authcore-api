import { type NextFunction, type Request, type Response } from 'express';

import type UserService from '../services/UserService.ts';
import type AuthService from '../services/AuthService.ts';

import type { IUserServiceAuth } from '../interfaces/Auth.ts';
import type { RegisterInput, LoginInput } from '../validation/auth.schema.ts';

class AuthController
{
    private authSvc: AuthService;
    private userSvc: IUserServiceAuth; 

    constructor(userService: UserService, authService: AuthService)
    {
        this.authSvc = authService;
        this.userSvc = userService;
    }

    public async register(req: Request<{}, {}, RegisterInput>, res: Response, next: NextFunction): Promise<Response | void>
    {
        const input: RegisterInput = req.body;

        await this.userSvc.createUser(input.email, input.password)
        return res.json({ message: "Usuário cadastrado com sucesso!" });   
    }

    public async login(req: Request<{}, {}, LoginInput>, res: Response, next: NextFunction): Promise<Response | void>
    {
        const input: LoginInput = req.body;

        await this.authSvc.login(input.email, input.password);
        return res.json({ message: "Usuário logado com sucesso!" });   
    }
}

export default AuthController;