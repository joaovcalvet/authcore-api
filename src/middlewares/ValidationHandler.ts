import type { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";

const validationHandler = function(schema: ZodType)
{
    return function(req: Request, res: Response, next: NextFunction)
    {
        try {
            const input = schema.parse(req.body);
            req.body = input;

            return next();
        } catch (error) {
            if(error instanceof ZodError)
                console.log("Erro durante validação do schema: ", typeof error);

            return next(error);
        }
    }
}

export default validationHandler;