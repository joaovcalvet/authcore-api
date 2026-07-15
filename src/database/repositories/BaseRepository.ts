import type { DatabaseSync } from "node:sqlite";
import AuthRepository from "./AuthRepository.ts";

class BaseRepository
{
    protected db: DatabaseSync;

    constructor(database: DatabaseSync)
    {
        this.db = database;
        this.initialize();
    }

    initialize(): void
    {
        AuthRepository;
    }
}

export default BaseRepository;