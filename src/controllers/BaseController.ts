import AuthController from "./AuthController.ts";
import type { PrismaClient } from "../database/generated/prisma/client.ts";

class BaseController
{
    private db: PrismaClient;

    public authController!: AuthController;

    constructor(database: PrismaClient) 
    {
        this.db = database;
        this.initialize();
    }

    private initialize(): void
    {
        this.authController = new AuthController(this.db);
    }
}

export default BaseController;