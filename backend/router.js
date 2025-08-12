import { Router } from "express";
import * as user from './requesthandler.js'
import Auth from './middleware/Auth.js'

const router = Router()
router.route('/signup').post(user.signUp)
router.route('/signin').post(user.signIn)
router.route('/profile').get(Auth,user.profile)
router.route('/listuser').get(Auth,user.Listuser)
router.route('/nav').get(Auth,user.Nav)
router.post('/message', Auth, user.sendMessage)
router.get('/messages/:otherUserId', Auth, user.getMessages)

router.get('/chatlist', Auth, user.getChatList);
export default router;