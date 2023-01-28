import { Router } from "express";
import { getUsers, register, login } from "../controllers/user.controller";
import {
  loginValidation,
  registerValidation,
} from "../validation/auth/userValidation";

const router = Router();

router.route("/").get(getUsers);
// parsing validation middlewares
router.route("/register").post(registerValidation, register);
router.route("/login").post(loginValidation, login);

export default router;
