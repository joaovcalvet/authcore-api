import { type NextFunction, type Request, type Response } from 'express';

import type UserService from '../services/UserService.ts';
import type AuthService from '../services/AuthService.ts';

import type { IUserServiceAuth, ILoginRequestBody, IRegisterRequestBody } from '../interfaces/Auth.ts';

class AuthController
{
    private authSvc: AuthService;
    private userSvc: IUserServiceAuth; 

    constructor(userService: UserService, authService: AuthService)
    {
        this.authSvc = authService;
        this.userSvc = userService;
    }

    public async register(req: Request<{}, {}, IRegisterRequestBody>, res: Response, next: NextFunction): Promise<Response | void>
    {
        // Validações
        if(req.body.email === undefined || req.body.email === "")
            return res.status(400).send("Email inválido!");

        if(req.body.password === undefined || req.body.password === "")
            return res.status(400).send("Senha inválida!");

        if(req.body.confirmPassword === undefined || req.body.confirmPassword === "")
            return res.status(400).send("Confirmação de senha inválida!");

        if(req.body.password != req.body.confirmPassword)
            return res.status(400).send("As senhas não batem!");

        // Lógica
        await this.userSvc.createUser(req.body.email, req.body.password)
        return res.send("Usuário cadastrado com sucesso!");   
    }

    public async login(req: Request<{}, {}, ILoginRequestBody>, res: Response, next: NextFunction): Promise<Response | void>
    {
        // Validação
        const { email, password } = req.body;

        if(!email || !password)
            return res.status(400).send("Email e senha são obrigatórios!");

        // Lógica
        await this.authSvc.login(email, password);
        return res.send("Usuário logado com sucesso!");   
    }
}

export default AuthController;