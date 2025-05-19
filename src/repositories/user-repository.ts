import { prisma } from "@/lib/prisma"
import { Prisma } from "generated/prisma"
import { IUserRepository } from "./user-repository-interface"

export class UserRepository implements IUserRepository {
    async create(data: Prisma.UserCreateInput) {
        return await prisma.user.create({ data })
    }

    async findByEmail(email: string) {
        return await prisma.user.findUnique({
            where: {
                email,
            }
        })
    }
}