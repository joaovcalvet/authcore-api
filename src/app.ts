import 'dotenv/config';
import AppRouter from './routes/index.routes.ts';
import express, { type Router, type Express } from 'express';

import type Database from './interfaces/Database.ts';
import { SQLiteDatabase } from './database/database.ts';

const port: string = process.env.APP_PORT || "3000";

const app: Express = express();
const db: Database = new SQLiteDatabase();
const router: Router = new AppRouter(db.connectDatabase()).initialize();

app.use(router);

app.listen(port, () => {
    console.log(`Aplicação rodando na porta: ${port}`)
});