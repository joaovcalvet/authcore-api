import express, { type Express, type Request, type Response } from 'express';

const port: Number = 3000;
const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.send("Hello, world!");
});

app.listen(port);