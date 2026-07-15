import express, { Router, type Request, type Response } from 'express';
import type { DatabaseSync } from 'node:sqlite';

class AuthRouter
{
    private db: DatabaseSync;

    constructor(database: DatabaseSync)
    {
        this.db = database;
    }

    initialize(): Router
    {
        const router = express.Router();

        router.use(express.json());

        // Rotas /auth
        router.post('/register', (req: Request, res: Response) => {
            // Validações
            if(req.body.email === undefined || req.body.email === "")
                return res.status(400).send("Email inválido!");

            if(req.body.password === undefined || req.body.password === "")
                return res.status(400).send("Senha inválida!");

            if(req.body.confirmPassword === undefined || req.body.confirmPassword === "")
                return res.status(400).send("Confirmação de senha inválida!");

            if(req.body.password != req.body.confirmPassword)
                return res.status(400).send("As senhas não batem!");

            const result = this.db.prepare("SELECT * FROM users WHERE email = ?").all(req.body.email);

            if(result.length !== 0)
                return res.status(400).send("Esse email já está em uso!");

            try {
                const insert = this.db.prepare("INSERT INTO users (email, password) VALUES (?, ?)");
                insert.run(req.body.email, req.body.password);
            } catch(error) {
                console.log(error);
                return res.status(400).send("Houve um erro ao cadastrar seu usuário. Tente novamente mais tarde.");
            }

            return res.send("Usuário cadastrado com sucesso!");
        });

        router.post('/login', (req: Request, res: Response) => {

            const result = this.db.prepare("SELECT * FROM users WHERE email = ?").get(req.body.email);

            if(result === undefined)
                return res.status(400).send("Email ou senha incorretos!");

            if(result.password != req.body.password)
                return res.status(400).send("Email ou senha incorretos!");

            return res.send("Usuário logado com sucesso!");
        });

        return router;
    }
}

export default AuthRouter;