import { UserRepository } from '@/repositories/user-repository'
import { expect, describe, it } from 'vitest'
import { UserService } from './user-service'
import bcrypt from 'bcryptjs'

describe('UserService', () => {
    it('should hash user password upon registration', async () => {
        const userService = new UserService({
            async create(_) {
                return {
                    id: 'user-01',
                    name: 'test',
                    email: 'test@test.com',
                    passwordHash: await bcrypt.hash('123456', 6),
                    createdAt: new Date(),
                }
            },
            async findByEmail(_) {
                return null
            }
        })

        const user = await userService.execute({
            name: 'test',
            email: 'test@test.com',
            password: '123456',
        })

        const isPasswordCorrectlyHashed = await bcrypt.compare('123456', user.passwordHash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })
})