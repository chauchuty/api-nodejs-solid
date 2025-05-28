import { prisma } from "@/lib/prisma"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { UserRepository } from "@/repositories/user-repository"
import { Authenticate } from "@/services/authenticate"
import { InvalidCredentials } from "@/errors/invalid-credentials-error"

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticate = new Authenticate(new UserRepository())

    const registerBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email, password } = registerBodySchema.parse(request.body)

    try {
        await authenticate.execute({
            email,
            password,
        })
        return reply.status(201).send()
    } catch (err) {
        if (err instanceof InvalidCredentials) {
            return reply.status(400).send({ message: err.message })
        }

        throw err
    }
}

export async function getUsers(request: FastifyRequest, reply: FastifyReply) {
    const users = await prisma.user.findMany()

    return reply.status(200).send(users)
}