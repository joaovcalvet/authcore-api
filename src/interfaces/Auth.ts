import type { User } from '../database/generated/prisma/client.ts';

// Services
export interface IUserServiceAuth
{
    createUser(email: string, password: string): Promise<void>
    findUserByEmail(email: string): Promise<User | null>
}

// Request
export interface ILoginRequestBody
{
    email?: string;
    password?: string;
}

export interface IRegisterRequestBody
{
    email?: string;
    password?: string;
    confirmPassword?: string;
}