import type { DatabaseSync } from "node:sqlite";

export default interface Database
{
    connectDatabase(): DatabaseSync
}