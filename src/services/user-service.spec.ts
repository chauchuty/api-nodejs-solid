import { expect, describe, it } from 'vitest'
import { UserService } from './user-service'
import bcrypt from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory-users.repository'

describe('UserService', () => {

    it('should be able to register', async () => {
        const userRepository = new InMemoryUserRepository()
        const registerUseCase = new UserService(userRepository)

        const user = await registerUseCase.execute({
            name: 'test',
            email: 'teste@gmail.com',
            password: '123456',
        })
        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const userRepository = new InMemoryUserRepository()
        const registerUseCase = new UserService(userRepository)

        const user = await registerUseCase.execute({
            name: 'test',
            email: 'teste@gmail.com',
            password: '123456',
        })


        const isPasswordCorrectlyHashed = await bcrypt.compare('123456', user.passwordHash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        const userRepository = new InMemoryUserRepository()
        const registerUseCase = new UserService(userRepository)

        const email = 'teste@gmail.com'

        const user = await registerUseCase.execute({
            name: 'test',
            email,
            password: '123456',
        })

        expect(async () => {
            await registerUseCase.execute({
                name: 'test',
                email,
                password: '123456',
            })
        }).rejects.toBeInstanceOf(Error)
    })
})