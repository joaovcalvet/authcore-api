import jwt from 'jsonwebtoken'

import type { User } from '../database/generated/prisma/client.ts';
import type { IncomingHttpHeaders } from 'node:http';

class JWTService
{
    public createAccessToken(user: User): string
    {
        if(user === null || user === undefined)
            throw new Error("Nenhum usuário passado ao JWT");

        return jwt.sign({ userId: user.id }, process.env.JWT_SECRET || '1234');
    }

    public getAccessTokenClaims(headers: IncomingHttpHeaders): { userId: number }
    {
        const token = headers.authorization?.split(' ')[1]!;
        return this.getClaims(token);
    }

    private getClaims(token: string)
    {
        const claims = jwt.verify(token, process.env.JWT_SECRET || '1234');
        return claims as { userId: number }
    }
}

export default JWTService;