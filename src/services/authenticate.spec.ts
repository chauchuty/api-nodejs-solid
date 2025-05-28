import { expect, describe, it, beforeEach } from 'vitest'
import { UserService } from './user-service'
import bcrypt from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory-users.repository'
import { Authenticate } from './authenticate'

let userRepository: InMemoryUserRepository
let sut: Authenticate

describe('Authenticate', () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new Authenticate(userRepository)
    })

    it('should be able to authenticate', async () => {
        await userRepository.create({
            name: 'teste',
            email: 'teste@gmail.com',
            passwordHash: await bcrypt.hash('123456', 6),
        })

        const { user } = await sut.execute({
            email: 'teste@gmail.com',
            password: '123456',
        })
        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {

        await userRepository.create({
            name: 'teste',
            email: 'teste@gmail.com',
            passwordHash: await bcrypt.hash('999999', 6),
        })


        expect(() => sut.execute({
            email: 'test@gmail.com',
            password: '123456',
        })).rejects.toBeInstanceOf(Error)
    })
})