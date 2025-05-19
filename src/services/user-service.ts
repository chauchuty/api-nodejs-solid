import { UserAlreadyExists } from "@/errors/user-already-exists"
import { UserRepository } from "@/repositories/user-repository"
import { hash } from "bcryptjs"

interface User {
    name: string,
    email: string,
    password: string
}

export class UserService {

    constructor(
        private userRepository: UserRepository
    ) { }

    async execute({
        name, email, password
    }: User) {
        const passwordHash = await hash(password, 6)

        const userWithSameEmail = await this.userRepository.findByEmail(email)
        if (userWithSameEmail) {
            throw new UserAlreadyExists()
        }

        return await this.userRepository.create({
            name, email, passwordHash: passwordHash
        })
    }
}