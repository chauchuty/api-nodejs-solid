import { prisma } from "@/lib/prisma"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { UserService } from "../services/user-service"
import { UserRepository } from "@/repositories/user-repository"
import { UserAlreadyExists } from "@/errors/user-already-exists"

export async function registerUser(request: FastifyRequest, reply: FastifyReply) {
    const userService = new UserService(new UserRepository())

    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        await userService.execute({
            name,
            email,
            password,
        })
        return reply.status(201).send()
    } catch (err) {
        if (err instanceof UserAlreadyExists) {
            return reply.status(409).send({ message: err.message })
        }

        return reply.status(500).send({ message: 'Internal server error' })
    }
}

export async function getUsers(request: FastifyRequest, reply: FastifyReply) {
    const users = await prisma.user.findMany()

    return reply.status(200).send(users)
}