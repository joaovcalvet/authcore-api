import 'dotenv/config';
import AppRouter from './routes/index.routes.ts';
import express, { type Router, type Express } from 'express';

import type Database from './interfaces/Database.ts';
import { SQLiteDatabase } from './database/database.ts';
import BaseController from './controllers/BaseController.ts';
import BaseService from './services/BaseService.ts';
import BaseRepository from './database/repositories/BaseRepository.ts';

// Env e Express
const port: string = process.env.APP_PORT || "3000";
const app: Express = express();

// Banco de Dados
const db: Database = new SQLiteDatabase();
const connection = db.connectDatabase();

// Inicializações
const repository = new BaseRepository(connection);
const service = new BaseService(repository);
const controller = new BaseController(service);
const router: Router = new AppRouter(controller).initialize();

// Rodando o Servidor
app.use(router);

app.listen(port, () => {
    console.log(`Aplicação rodando na porta: ${port}`)
});