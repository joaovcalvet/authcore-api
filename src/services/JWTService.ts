import jwt from 'jsonwebtoken'

import type { User } from '../database/generated/prisma/client.ts';

class JWTService
{
    public createAccessToken(user: User): string
    {
        if(user === null || user === undefined)
            throw new Error("Nenhum usuário passado ao JWT");

        return jwt.sign({ userId: user.id }, process.env.JWT_SECRET || '1234');
    }
}

export default JWTService;