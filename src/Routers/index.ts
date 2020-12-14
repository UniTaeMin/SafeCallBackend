import * as express from "express"
import Chatbot from "./chatbot/chatbot.router"
const router = express.Router()
router.use("/chatbot", Chatbot)
export default router
