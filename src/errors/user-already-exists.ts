export class UserAlreadyExists extends Error {
    constructor() {
        super('Enmail já cadastrado')
    }
}