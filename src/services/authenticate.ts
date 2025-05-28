import { InvalidCredentials } from "@/errors/invalid-credentials-error";
import { UserRepository } from "@/repositories/user-repository";
import { compare } from "bcryptjs";
import { User } from "../../generated/prisma";

interface AuthenticateRequest {
    email: string;
    password: string;
}

interface AuthenticateResponse {
    user: User
}

export class Authenticate {
    constructor(
        private userRepository: UserRepository
    ) { }

    async execute({ email, password }: AuthenticateRequest): Promise<AuthenticateResponse> {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentials()
        }

        const doesPasswordMatches = await compare(password, user.passwordHash)

        if (!doesPasswordMatches) {
            throw new InvalidCredentials()
        }

        return {
            user
        }
    }
}