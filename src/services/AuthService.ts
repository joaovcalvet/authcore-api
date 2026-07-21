import bcrypt from 'bcrypt';

import type JWTService from './JWTService.ts';
import type UserService from './UserService.ts';

import { DomainError } from '../errors/DomainError.ts';

class AuthService
{
    private userSvc: UserService;
    private jwtSvc: JWTService;

    constructor(userService: UserService, jwtService: JWTService)
    {
        this.userSvc = userService;
        this.jwtSvc = jwtService;
    }

    public async login(email: string, password: string): Promise<string>
    {
        const user = await this.userSvc.findUserByEmail(email);

        if(user === null || !await bcrypt.compare(password, user.password))
            throw new DomainError("Email ou senha incorretos!");

        return this.jwtSvc.createAccessToken(user);
    }
}

export default AuthService;