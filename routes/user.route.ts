import {Router} from "express"
import { getUsers, login, Register, singleUser } from "../controller/user.controller"

const router = Router()

router.route("/register").post(Register)
router.route("/login").post(login)
router.route("/getAllUsers").get(getUsers)
router.route("/singleget").post(singleUser)


export default router;