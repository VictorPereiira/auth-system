import { z } from "zod";

export const auth_input_values_schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
})
export type auth_input_values_type = z.infer<typeof auth_input_values_schema>;