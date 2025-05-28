import { FastifyInstance } from "fastify";
import { getUsers, registerUser } from "./controllers/user-controller";
import { authenticate } from "./controllers/authenticate-controller";

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', registerUser)
    app.get('/users', getUsers)
    app.post('/sessions', authenticate)
}