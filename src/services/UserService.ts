import bcrypt from 'bcrypt';

import { EmailAlreadyExistsError } from '../errors/DomainError.ts';

import type { User } from '../database/generated/prisma/client.ts';
import type UserRepository from "../database/repositories/UserRepository.ts";

class UserService
{
    private userRepo: UserRepository;

    constructor(userRepository: UserRepository) 
    {
        this.userRepo = userRepository;
    }

    public async createUser(email: string, password: string): Promise<void>
    {
        if(await this.findUserByEmail(email) !== null)
            throw new EmailAlreadyExistsError();

        const hashedPassword = await bcrypt.hash(password, 10);
        await this.userRepo.createUser(email, hashedPassword);
    }

    public async findUserById(id: number): Promise<User | null>
    {
        return await this.userRepo.getUserById(id);
    }

    public async findUserByEmail(email: string): Promise<User | null>
    {
        return await this.userRepo.getUserByEmail(email);
    }
}

export default UserService;