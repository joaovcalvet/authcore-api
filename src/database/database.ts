import type Database from '../interfaces/Database.ts';
import { PrismaClient } from "./generated/prisma/client.ts";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

/* 
    Classe que "cria" o banco de dados
    Aqui dentro eu posso fazer o que eu quiser com o banco contanto que eu devolva uma conexão com o banco

    Se um dia migrar-mos para outro banco ou precisar-mos de mais de um tipo de conexão
    ou se precisar-mos conectar em múltiplos bancos, só preciso mexer aqui e replicar.
*/

export class SQLiteDatabase implements Database
{
    private connectionString: string;
    private adapter: PrismaBetterSqlite3;

    constructor()
    {
        this.connectionString = process.env.DATABASE_URL || "file:./dev.db";
        this.adapter = new PrismaBetterSqlite3({ url: this.connectionString });
    }

    connectDatabase(): PrismaClient
    {
        return new PrismaClient({ adapter: this.adapter });
    }
}