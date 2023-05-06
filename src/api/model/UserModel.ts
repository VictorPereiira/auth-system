import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// JWT Secret
import * as dotenv from 'dotenv';
dotenv.config();
const SECRET: string = process.env.JWT_SECRET || "";

// MongoDB 
const authSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, unique: true },
    createAt: { type: Date, default: new Date() }
})
const mongoModel = model("Auth", authSchema);

class AuthMongoModel {
    async signup(data: any) {
        const hashedPassword = bcrypt.hashSync(data.password, 10);
        data.password = hashedPassword;
        try {
            // Check Exist User
            const hasExistsUser = await mongoModel.findOne({ email: data.email })
            if (hasExistsUser) {
                return {
                    error: "The user exists."
                }
            }
            // Create a user
            return await mongoModel.create(data);
        } catch (error: any) {
            return {
                error: error.message
            }
        }
    }

    // async login(data: any) {
    // const { email, password } = data;
    // try {
    //     return await mongoModel.findOne({ email }, (error: any, user: any) => {
    //         if (!user) {
    //             return {
    //                 statusCode: 401,
    //                 message: "Email incorrect",
    //             }
    //         };
    //         const checkPassword = bcrypt.compareSync(password, user.password);
    //         if (!checkPassword) {
    //             return {
    //                 statusCode: 401,
    //                 message: "Password incorrect",
    //             }
    //         };
    //         const token = jwt.sign({ name: user.name }, SECRET);
    //         return {
    //             statusCode: 200,
    //             message: "Login success",
    //             data: {
    //                 token
    //             }
    //         }
    //     })
    // } catch (error: any) {
    //     console.error(error);
    //     return {
    //         message: error.message,
    //     };
    // }
    // }
}

export default new AuthMongoModel();