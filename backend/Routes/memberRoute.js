    import express from 'express'

    import * as memberController from "../Controllers/memberController.js"

    const router = express.Router()

    router.get("/members/detail",memberController.getMember)
    router.post("/members",memberController.postMember)
    router.post("/members/login",memberController.loginMember)

    export default router 