import 'dotenv/config';
import router from './routes.ts';
import express, { type Express } from 'express';

const port: string = process.env.APP_PORT || "3000";
const app: Express = express();

app.use(router);

app.listen(port, () => {
    console.log(`Aplicação rodando na porta: ${port}`)
});