import bcrypt from 'bcrypt';

import type { User } from '../database/generated/prisma/client.ts';
import type UserRepository from "../database/repositories/UserRepository.ts";

class UserService
{
    private userRepo: UserRepository;

    constructor(userRepository: UserRepository) 
    {
        this.userRepo = userRepository;
    }

    public async createUser(email: string, password: string): Promise<boolean>
    {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await this.userRepo.createUser(email, hashedPassword)
        } catch(error) {
            console.log(error);
            return false;
        }

        return true;
    }

    public async findUserByEmail(email: string): Promise<User | null>
    {
        return await this.userRepo.getUserByEmail(email);
    }
}

export default UserService;