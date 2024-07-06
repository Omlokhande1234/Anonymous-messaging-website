import {z} from 'zod'
import { emailValidation, passwordValidation } from './signUpSchema'

export const signinSchema=z.object({
    identifier:emailValidation,
    password:passwordValidation
})