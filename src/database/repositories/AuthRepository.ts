import type { DatabaseSync } from "node:sqlite";
import BaseRepository from "./BaseRepository.ts";

class AuthRepository extends BaseRepository
{
    constructor(database: DatabaseSync)
    {
        super(database);
    }
}

export default AuthRepository;