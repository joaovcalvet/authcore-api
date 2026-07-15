import 'dotenv/config';
import { DatabaseSync } from 'node:sqlite';
import express, { type Express, type Request, type Response } from 'express';

const port: string = process.env.APP_PORT || "3000";
const database_path: string = process.env.DATABASE_PATH || "database.sqlite";

const app: Express = express();
const database: DatabaseSync = new DatabaseSync(database_path);

app.use(express.json());

// Rota de Teste
app.get('/', (req: Request, res: Response) => {
    res.send("Hello, world!");
});

// Rotas Auth
app.post('/auth/register', (req: Request, res: Response) => {
    // Validações
    if(req.body.email === undefined || req.body.email === "")
        return res.status(400).send("Email inválido!");

    if(req.body.password === undefined || req.body.password === "")
        return res.status(400).send("Senha inválida!");

    if(req.body.confirmPassword === undefined || req.body.confirmPassword === "")
        return res.status(400).send("Confirmação de senha inválida!");

    if(req.body.password != req.body.confirmPassword)
        return res.status(400).send("As senhas não batem!");

    const result = database.prepare("SELECT * FROM users WHERE email = ?").all(req.body.email);

    if(result.length !== 0)
        return res.status(400).send("Esse email já está em uso!");

    try {
        const insert = database.prepare("INSERT INTO users (email, password) VALUES (?, ?)");
        insert.run(req.body.email, req.body.password);
    } catch(error) {
        console.log(error);
        return res.status(400).send("Houve um erro ao cadastrar seu usuário. Tente novamente mais tarde.");
    }

    return res.send("Usuário cadastrado com sucesso!");
});

app.post('/auth/login', (req: Request, res: Response) => {

    const result = database.prepare("SELECT * FROM users WHERE email = ?").get(req.body.email);

    if(result === undefined)
        return res.status(400).send("Email ou senha incorretos!");

    if(result.password != req.body.password)
        return res.status(400).send("Email ou senha incorretos!");

    return res.send("Usuário logado com sucesso!");
});

app.listen(port, () => {
    console.log(`Aplicação rodando na porta: ${port}`)
});