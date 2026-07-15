import { type Request, type Response } from 'express';
import type { LoginRequestBody, RegisterRequestBody } from '../interfaces/AuthRequest.ts';
import type { PrismaClient } from '../database/generated/prisma/client.ts';

interface AuthControllerInterface
{
    register(req: Request<{}, {}, RegisterRequestBody>, res: Response): Promise<Response<any, Record<string, any>>>;
    login(req: Request<{}, {}, LoginRequestBody>, res: Response): Promise<Response<any, Record<string, any>>>;
}

class AuthController implements AuthControllerInterface
{
    private db: PrismaClient

    constructor(database: PrismaClient)
    {
        this.db = database;
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

        const user = await this.db.user.findFirst({ where: { email: req.body.email } });

        if(user != null)
            return res.status(400).send("Esse email já está em uso!");

        try {
            await this.db.user.create({ data: { email: req.body.email, password: req.body.password } });
        } catch(error) {
            console.log(error);
            return res.status(400).send("Houve um erro ao cadastrar seu usuário. Tente novamente mais tarde.");
        }

        return res.send("Usuário cadastrado com sucesso!");
    }

    public async login(req: Request<{}, {}, LoginRequestBody>, res: Response): Promise<Response<any, Record<string, any>>>
    {
        const { email, password } = req.body;

        if(!email || !password)
            return res.status(400).send("Email e senha são obrigatórios!");

        const user = await this.db.user.findFirst({ where: { email: email } });

        if(user === null)
            return res.status(400).send("Email ou senha incorretos!");

        if(user.password != password)
            return res.status(400).send("Email ou senha incorretos!");

        return res.send("Usuário logado com sucesso!");
    }
}

export default AuthController;