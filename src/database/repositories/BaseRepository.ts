import type { PrismaClient } from "../generated/prisma/client.ts";

import UserRepository from "./UserRepository.ts";

class BaseRepository
{
    protected db: PrismaClient;

    public userRepository!: UserRepository;

    constructor(database: PrismaClient)
    {
        this.db = database;
        this.initialize();
    }

    initialize(): void
    {
        this.userRepository = new UserRepository(this.db);
    }
}

export default BaseRepository;