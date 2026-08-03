import {z} from "zod"

export const emailSchema=z.object({
    email:z.email(),
    message:z.string().min(10)
})
