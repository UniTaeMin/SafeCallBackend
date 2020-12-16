import * as bcrypt from "bcrypt-nodejs"
import { Request, Response } from "express"
import Send from "../../Module/Send"
import axios from "axios"
require("dotenv").config()
const parents = require('../../../parentsConfig.json');
const couple = require('../../../coupleConfig.json');

const googleAuth = require('google-oauth-jwt');

/**
 * @swagger
 * /chatbot:
 *   get:
 *     summary: Dialogflow를 통해 대화를 주고 받습니다.
 *     tags: 
 *	     - ChatBot
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: type
 *         type: string
 *       - in: query
 *         name: text
 *         type: string
 *     responses:
 *       200:
 *         schema:
 *           $ref: "#/definitions/ResponseChatbot"
 */
export const Chatbot = async (req: Request, res: Response) => {

    if (req.query.type == 'parents') {
        googleAuth.authenticate(
            {
                email: parents.client_email,
                key: parents.private_key,
                scopes: ["https://www.googleapis.com/auth/dialogflow"]
            },
            (err, token) => {
                if (err) {
                    return Send(res, 500, '구글 문제');
                } else {
                    var postData = { "queryInput": { "text": { "text": req.query.text, "languageCode": "ko" } }, "queryParams": { "timeZone": "Asia/Seoul" } }
                    axios.post(`https://dialogflow.googleapis.com/v2/projects/safecall/agent/sessions/a1fc5fd7-dd2c-9590-f998-b57d064a18e0:detectIntent`,
                        postData, {
                        headers: {
                            'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json; charset=utf-8',
                        },

                    }).then((result: any) => {
                        return Send(res, 200, result.data.queryResult.fulfillmentText);
                    }).catch(e => {
                        return Send(res, 500, '에러' + e)
                    });
                }
            }
        )
    } else if (req.query.type == 'couple') {
        googleAuth.authenticate(
            {
                email: couple.client_email,
                key: couple.private_key,
                scopes: ["https://www.googleapis.com/auth/dialogflow"]
            },
            (err, token) => {
                if (err) {
                    return Send(res, 500, '구글 문제');
                } else {
                    var postData = { "queryInput": { "text": { "text": req.query.text, "languageCode": "ko" } }, "queryParams": { "timeZone": "Asia/Seoul" } }
                    axios.post(`https://dialogflow.googleapis.com/v2/projects/safecall2/agent/sessions/a1fc5fd7-dd2c-9590-f998-b57d064a18e0:detectIntent`,
                        postData, {
                        headers: {
                            'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json; charset=utf-8',
                        },

                    }).then((result: any) => {
                        return Send(res, 200, result.data.queryResult.fulfillmentText);
                    }).catch(e => {
                        return Send(res, 500, '에러' + e)
                    });
                }
            }
        )
    } else {
        return Send(res, 200, '타입을 지정해주세요')
    }
}
/**
 * @swagger
 * /chatbot/address__list:
 *   get:
 *     summary: 주소록을 받습니다.
 *     tags: 
 *	     - ChatBot
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         schema:
 *           $ref: "#/definitions/ResponseAddressList"
 */
export const List = (req, res) => {
    return Send(res, 200, [{ name: "엄마", voice: "중저음의 여성 보이스", desc: "부모님과 통화하는 대화 패턴" }, { name: "아빠", voice: "중저음의 남성 보이스", desc: "부모님과 통화하는 대화 패턴" }, { name: "친구(여성)", voice: "높은 여성 보이스", desc: "친한 친구와 통화하는 대화 패턴" }, { name: "친구(남성)", voice: "높은 남성 보이스", desc: "친한 친구와 통화하는 대화 패턴" }]);
}

/**
 * @swagger
 * /chatbot/chat__list:
 *   get:
 *     summary: 대화 내용을 받습니다.
 *     tags: 
 *	     - ChatBot
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         schema:
 *           $ref: "#/definitions/ResponseChatList"
 */
export const ChatList = (req, res) => {
    return Send(res, 200, [
		{
            "type": "친구",
            "question": "여보세요",
            "answer": "여보세요?"
        },
        {
            "type": "친구",
            "question": "왜 전화했어?",
            "answer": "그냥 심심해서 전화했어\n할게 없어서 전화했어"
        },
        {
            "type": "친구",
            "question": "잘 지냈어?",
            "answer": "잘 지냈지. 너는 잘 지냈니?"
        },
        {
            "type": "친구",
            "question": "나도 잘 지내",
            "answer": "그렇구나"
        },
        {
            "type": "친구",
            "question": "밥 먹었어?\n아침 먹었어?\n점심 먹었어?\n저녁 먹었어?",
            "answer": "아니, 아직 안 먹었어. 너는?\n곧 먹으려고 준비 중이야. 너는?"
        },
        {
            "type": "친구",
            "question": "나는 집가서 먹으려고\n조금 있다가 먹으려고\n이미 먹었어\n아직 안 먹었어",
            "answer": "그렇구나"
        },
        {
            "type": "친구",
            "question": "밥 뭐 먹을까?\n아침 뭐 먹을까?\n점심 뭐 먹을까?\n저녁 뭐 먹을까?",
            "answer": "집밥 먹자\n요즘 안 먹은 음식 먹어봐"
        },
        {
            "type": "친구",
            "question": "숙제는 다 했어?",
            "answer": "아니, 아직 다 못했어. 너는?\n어! 방금 다 끝냈어 너는?"
        },
        {
            "type": "친구",
            "question": "나는 아직 다 못 끝냈어\n나는 다 끝냈어\n나는 조금만 하면 끝나",
            "answer": "아하 그렇구나"
        },
        {
            "type": "친구",
            "question": "너는 지금 어디야?",
            "answer": "나는 지금 집이야. 너는 집 언제가?\n지금 밖이야. 너는 집 언제 들어가?"
        },
        {
            "type": "친구",
            "question": "지금 집 거의 다 왔어\n곧 집 들어가\n거의 다 왔어",
            "answer": "길 조심하고 빨리 들어가"
        },
		{
            "type": "부모님",
            "question": "여보세요",
            "answer": "여보세요?"
        },
        {
            "type": "부모님",
            "question": "왜 전화 하셨어요?",
            "answer": "심심해서 전화해 봤어"
        },
        {
            "type": "부모님",
            "question": "그동안 잘 지내셨어요?",
            "answer": "잘 지냈지. 너는 잘 지냈니?"
        },
        {
            "type": "부모님",
            "question": "저도 잘 지내고 있습니다.",
            "answer": "그렇구나"
        },
        {
            "type": "부모님",
            "question": "밥은 드셨어요?\n아침 드셨나요?\n점심 드셨나요?\n저녁 드셨나요?",
            "answer": "아니, 아직 안 먹었어. 너는?\n곧 먹으려고 준비 중이야. 너는?"
        },
        {
            "type": "부모님",
            "question": "저는 집가서 먹으려구요.\n이미 먹었어요.\n저는 먹었어요",
            "answer": "그렇구나"
        },
        {
            "type": "부모님",
            "question": "밥 뭐 먹을까요?\n아침 뭐 먹을까요?\n점심 뭐 먹을까요?\n저녁 뭐 먹을까요?",
            "answer": "요즘 안 먹은 음식 먹어봐"
        },
        {
            "type": "부모님",
            "question": "지금 어디에요?\n지금 어디 계세요?",
            "answer": "나는 지금 집이야. 너는 집 언제가?\n지금 밖이야. 너는 집 언제 들어오니?"
        },
        {
            "type": "부모님",
            "question": "지금 집 거의 다 왔어요.\n곧 집에 들어가요.\n지금 거의 다 왔어요.",
            "answer": "길 조심하고 빨리 들어가"
        }
    ]);
}


