import bcrypt from 'bcrypt';
import type UserService from './UserService.ts';

class AuthService
{
    private userSvc: UserService;

    constructor(userService: UserService)
    {
        this.userSvc = userService;
    }

    public async login(email: string, password: string): Promise<boolean>
    {
        const user = await this.userSvc.findUserByEmail(email);

        if(user === null)
            return false;

        if(!await bcrypt.compare(password, user.password))
            return false;

        return true;
    }
}

export default AuthService;