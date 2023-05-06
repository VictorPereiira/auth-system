import { Request, Response } from "express";
import { auth_input_values_schema, auth_input_values_type } from "./AuthTypes";
import AuthMongoModel from "../../model/UserModel";

class AuthController {
    async signup(req: Request, res: Response) {
        const data = req.body;
        // Check
        const hasErrorSchema = auth_input_values_schema.safeParse(data);
        if (!hasErrorSchema.success) {
            return res.status(500).json({
                message: "Input value incorrect",
                data: hasErrorSchema.error.errors
            });
        };
        // DB Request
        const response: any = await AuthMongoModel.signup(data);
        if (response.error) {
            return res.status(500).json({ message: response.error });
        }
        return res.status(201).json({
            message: "User created with success!",
            data: response
        })
    }
};

export default new AuthController();