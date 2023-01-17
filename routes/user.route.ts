import { Router } from "express";
import {register,getUsers,login} from "../controller/user.controller"

const router = Router();

router.route("/register").post(register)
router.route("/").get(getUsers)
router.route("/login").post(login)

export default router