import { Prisma, User } from "generated/prisma";
import { IUserRepository } from "./user-repository-interface";

export class InMemoryUserRepository implements IUserRepository {
    public items: User[] = []

    create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: 'user-01',
            name: data.name,
            email: data.email,
            passwordHash: data.passwordHash,
            createdAt: new Date(),
        }

        this.items.push(user)

        return Promise.resolve(user)
    }

    findByEmail(email: string): Promise<User | null> {
        const user = this.items.find(item => item.email === email)

        if (!user) {
            return Promise.resolve(null)
        }

        return Promise.resolve(user)
    }

}