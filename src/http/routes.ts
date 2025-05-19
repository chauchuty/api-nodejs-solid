import { FastifyInstance } from "fastify";
import { getUsers, registerUser } from "./controllers/user-controller";

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', registerUser)
    app.get('/users', getUsers)
}