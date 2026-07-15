import type { DatabaseSync } from "node:sqlite";
import AuthController from "./AuthController.js";

class BaseController
{
    private db: DatabaseSync;

    public authController!: AuthController;

    constructor(database: DatabaseSync) 
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