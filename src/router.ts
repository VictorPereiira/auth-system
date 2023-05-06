import { Router } from "express";
const routes = Router();

import AuthController from "./api/controller/auth"
routes.route("/signup")
    .post(AuthController.signup)

routes.route("/signin")
    .get(AuthController.signin)

export default routes;