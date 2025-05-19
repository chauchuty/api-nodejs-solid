import { UserRepository } from '@/repositories/user-repository'
import { expect, describe, it } from 'vitest'
import { UserService } from './user-service'
import bcrypt from 'bcryptjs'

describe('UserService', () => {
    it('should hash user password upon registration', async () => {
        const userService = new UserService(new UserRepository())
        const password = '123456'
        const user = await userService.execute({
            name: 'John Doe',
            email: 'cesar.chauchuty766@gmail.com',
            password,
        })

        const isPasswordCorrectlyHashed = await bcrypt.compare(password, user.passwordHash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })
})