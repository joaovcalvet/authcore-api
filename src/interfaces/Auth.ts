import type { User } from '../database/generated/prisma/client.ts';

// Services
export interface IUserServiceAuth
{
    createUser(email: string, password: string): Promise<void>
    findUserByEmail(email: string): Promise<User | null>
}