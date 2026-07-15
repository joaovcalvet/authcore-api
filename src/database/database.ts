import { DatabaseSync } from 'node:sqlite';
import type Database from '../interfaces/Database.ts';

/* 
    Classe que "cria" o banco de dados
    Aqui dentro eu posso fazer o que eu quiser com o banco contanto que eu devolva uma conexão com o banco

    Se um dia migrar-mos para outro banco ou precisar-mos de mais de um tipo de conexão
    ou se precisar-mos conectar em múltiplos bancos, só preciso mexer aqui e replicar.
*/

export class SQLiteDatabase implements Database
{
    private DATABASE_PATH: string;

    constructor()
    {
        this.DATABASE_PATH = process.env.DATABASE_PATH || "database.sqlite";
    }

    connectDatabase(): DatabaseSync
    {
        return new DatabaseSync(this.DATABASE_PATH);
    }
}