import express from 'express'

import * as memberController from "../Controllers/memberController.js"

const router = express.Router()

router.post("/members",memberController.postMember)


export default router 