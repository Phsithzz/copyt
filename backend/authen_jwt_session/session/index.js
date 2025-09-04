import express from "express"
import bodyParser from "body-parser"
import session from "express-session"
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(session({
    secret: 'thailandgogo',
    resave: false, //กำหนดว่าจะบันทึก session ลงใน storage ทุกครั้งที่ request มาหรือไม่ ถึงแม้ว่า session นั้นจะไม่มีการเปลี่ยนแปลงใดๆ
    saveUninitialized: true //กำหนดว่าจะบันทึก session ที่ยังไม่ได้ถูก initialize (ยังไม่มีข้อมูล) ลงใน storage หรือไม่
}))

app.post('/login',(req,res)=>{
    console.log("POST / is requested")
    const bodydata=req.body
    console.log(bodydata)
    req.session.userid=bodydata.id
    req.session.username=bodydata.name
    req.session.userrole=bodydata.role
    return res.status(201).json({message:"Success"})
})

app.get('/get_session',(req,res)=>{
    console.log("GET /SESSION is requested")
    const thedata={
        id:req.session.userid,
        name:req.session.username,
        role:req.session.userrole
    }
    // console.log(req.session)
    console.log(thedata)
    return res.status(200).json(thedata)
    // return res.status(200).json(req.session)
})




app.listen(port,()=>{
    console.log(`Server is Running [SESSION] on port ${port}`)
})