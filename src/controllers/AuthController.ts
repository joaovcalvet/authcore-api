import { type Request, type Response } from 'express';

import type UserService from '../services/UserService.ts';
import type AuthService from '../services/AuthService.ts';

import type { LoginRequestBody, RegisterRequestBody } from '../interfaces/AuthRequest.ts';

interface AuthControllerInterface
{
    register(req: Request<{}, {}, RegisterRequestBody>, res: Response): Promise<Response<any, Record<string, any>>>;
    login(req: Request<{}, {}, LoginRequestBody>, res: Response): Promise<Response<any, Record<string, any>>>;
}

class AuthController implements AuthControllerInterface
{
    private authSvc: AuthService;
    private userSvc: UserService; 

    constructor(userService: UserService, authService: AuthService)
    {
        this.authSvc = authService;
        this.userSvc = userService;
    }

    public async register(req: Request<{}, {}, RegisterRequestBody>, res: Response): Promise<Response<any, Record<string, any>>>
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

        if(await this.userSvc.findUserByEmail(req.body.email) !== null)
            return res.status(400).send("Esse email já está em uso!");

        if(!await this.userSvc.createUser(req.body.email, req.body.password))
            return res.status(400).send("Houve um erro ao cadastrar seu usuário. Tente novamente mais tarde.");

        return res.send("Usuário cadastrado com sucesso!");
    }

    public async login(req: Request<{}, {}, LoginRequestBody>, res: Response): Promise<Response<any, Record<string, any>>>
    {
        const { email, password } = req.body;

        if(!email || !password)
            return res.status(400).send("Email e senha são obrigatórios!");

        if(!await this.authSvc.login(email, password))
            return res.status(400).send("Email ou senha incorretos!");

        return res.send("Usuário logado com sucesso!");
    }
}

export default AuthController;