import 'dotenv/config';
import AppRouter from './routes/index.routes.ts';
import express, { type Router, type Express } from 'express';

import type Database from './interfaces/Database.ts';
import { SQLiteDatabase } from './database/database.ts';
import BaseController from './controllers/BaseController.ts';

// Env e Express
const port: string = process.env.APP_PORT || "3000";
const app: Express = express();

// Banco de Dados
const db: Database = new SQLiteDatabase();
const connection = db.connectDatabase();

// Inicializações
const controller = new BaseController(connection);
const router: Router = new AppRouter(controller).initialize();

// Rodando o Servidor
app.use(router);

app.listen(port, () => {
    console.log(`Aplicação rodando na porta: ${port}`)
});