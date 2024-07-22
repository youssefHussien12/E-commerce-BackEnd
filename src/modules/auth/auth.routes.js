import { Router } from "express";
import {  changeUserPassword, signIn, signUp} from "./auth.controller.js";
import { catchError } from "../../middleware/catchError.js";
import { checkEmail } from "../../middleware/checkEmail.js";


const authRouter=Router()

authRouter.post('/signup',checkEmail,catchError(signUp))
authRouter.post('/sign-in',catchError(signIn))
authRouter.patch('/change-password',catchError(changeUserPassword))


export default authRouter