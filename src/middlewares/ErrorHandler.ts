import { ZodError } from "zod";
import type { Request, Response, NextFunction } from "express";

import { DomainError } from "../errors/DomainError.ts";
import type { ErrorResponse } from "../interfaces/Error.ts";

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction)
{
    if(err instanceof DomainError)
        return res.status(400).json({ message: err.message });

    if(err instanceof ZodError)
    {
        const errorResponse: ErrorResponse = {
            message: "Ocorreu um erro na validação dos campos.",
            errors: []
        };

        err.issues.forEach(error => {
            errorResponse.errors.push({
                field: error.path,
                message: error.message
            });
        });

        return res.status(400).json(errorResponse);
    }

    console.log(err);
    return res.status(500).send("Ocorreu um erro interno. Tente novamente mais tarde.");
}

export default errorHandler;