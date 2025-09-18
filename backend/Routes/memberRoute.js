    import express from 'express'

    import * as memberController from "../Controllers/memberController.js"

    const router = express.Router()

    router.get("/members/detail",memberController.getMember)
    router.get("/members/logout",memberController.logoutMember)
    router.post("/members",memberController.postMember)
    router.post("/members/login",memberController.loginMember)

    export default router 