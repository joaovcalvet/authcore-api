import type { Request, Response, NextFunction } from "express";

import { DomainError } from "../errors/DomainError.ts";

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction)
{
    if(err instanceof DomainError)
        return res.status(400).send(err.message);

    console.log(err);
    return res.status(500).send("Ocorreu um erro interno. Tente novamente mais tarde");
}

export default errorHandler;