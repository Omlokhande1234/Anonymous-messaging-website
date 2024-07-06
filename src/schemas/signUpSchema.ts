import { z } from "zod";

export const usernameValidation=z
         .string()
         .min(3,"Username must be at least 3 characters long")
         .max(20,"Username must be at most 20 characters long")
         .regex(/^[a-zA-Z0-9_]+$/,"Username must be alphanumeric")

export const emailValidation=z
         .string()
         .email("Email must be a valid email address")
         .regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ,"Email must be a valid email address")
export const passwordValidation=z
         .string()
         .min(8,"Password must be at least 8 characters long")
         
export const signUpSchema=z.object({
    username:usernameValidation,
    email:emailValidation,
    password:passwordValidation
})