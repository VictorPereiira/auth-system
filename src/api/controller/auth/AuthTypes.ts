import { z } from "zod";

export const signup_input_values_schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
})
export type signup_input_values_type = z.infer<typeof signup_input_values_schema>;

export const signin_input_values_schema = signup_input_values_schema.omit({ name: true })
export type signin_input_values_type = z.infer<typeof signin_input_values_schema>;