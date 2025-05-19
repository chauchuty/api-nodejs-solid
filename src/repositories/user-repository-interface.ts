import { Prisma, User } from "generated/prisma";

export interface IUserRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findByEmail(email: string): Promise<User | null>
}