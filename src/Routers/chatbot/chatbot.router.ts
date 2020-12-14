import * as express from "express"
import { Chatbot,List,ChatList } from "./chatbot.controller"
const router = express.Router()
router.get("/", Chatbot)
router.get("/address__list", List)
router.get("/chat__list", ChatList)
export default router
