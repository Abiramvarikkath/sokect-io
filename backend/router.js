import { Router } from "express";
import * as user from './requesthandler.js'
import Auth from './middleware/Auth.js'

const router = Router()
router.route('/signup').post(user.signUp)
router.route('/signin').post(user.signIn)
router.route('/profile').get(Auth,user.profile)
export default router;