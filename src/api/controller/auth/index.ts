import { Request, Response } from "express";

import AuthMongoModel from "../../model/UserModel";
import { signin_input_values_schema, signup_input_values_schema } from "./AuthTypes";

class AuthController {
    async signup(req: Request, res: Response) {
        const data = req.body;
        // Check
        const hasErrorSchema = signup_input_values_schema.safeParse(data);
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

    async signin(req: Request, res: Response) {
        const data = req.body;
        // Check
        const hasErrorSchema = signin_input_values_schema.safeParse(data);
        if (!hasErrorSchema.success) {
            return res.status(500).json({
                message: "Input value incorrect",
                data: hasErrorSchema.error.errors
            });
        };
        // DB Request
        const response: any = await AuthMongoModel.signin(data);
        if (response.error) {
            return res.status(response.statusCode).json({ message: response.error });
        }
        return res.status(200).json({
            message: "Sing in!",
            data: response
        })
    }
};

export default new AuthController();