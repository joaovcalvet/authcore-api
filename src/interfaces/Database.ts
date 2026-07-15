import { type PrismaClient } from '../database/generated/prisma/client.ts'

export default interface Database
{
    connectDatabase(): PrismaClient
}