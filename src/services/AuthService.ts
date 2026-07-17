import bcrypt from 'bcrypt';

import type UserService from './UserService.ts';
import { DomainError } from '../errors/DomainError.ts';

class AuthService
{
    private userSvc: UserService;

    constructor(userService: UserService)
    {
        this.userSvc = userService;
    }

    public async login(email: string, password: string): Promise<void>
    {
        const user = await this.userSvc.findUserByEmail(email);

        if(user === null || !await bcrypt.compare(password, user.password))
            throw new DomainError("Email ou senha incorretos!");
    }
}

export default AuthService;