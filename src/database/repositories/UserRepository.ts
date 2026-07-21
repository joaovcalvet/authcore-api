import type { PrismaClient, User } from "../generated/prisma/client.ts";

class UserRepository
{
    private db: PrismaClient;

    constructor(database: PrismaClient) 
    {
        this.db = database;
    }

    public async createUser(email: string, hashedPassword: string): Promise<User>
    {
        return await this.db.user.create(
            { 
                data: { 
                    email: email, 
                    password: hashedPassword 
                } 
            }
        );
    }

    public async getUserById(id: number): Promise<User | null>
    {
        return await this.db.user.findFirst(
            {
                where: {
                    id: id
                }
            }
        );
    }

    public async getUserByEmail(email: string): Promise<User | null>
    {
        return await this.db.user.findFirst(
            { 
                where: { 
                    email: email 
                } 
            }
        );
    }
}

export default UserRepository;