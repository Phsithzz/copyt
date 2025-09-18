import database from "../Services/database.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

export const logoutMember = async (req, res) => {
  console.log("POST /logout member is requested.");
  try {
     res.clearCookie('token',{
                // maxAge:3600000, //3,600,000 ms --> 60 minute -->1hr,
                httpOnly: true, // ป้องกันการเข้าถึง Token ผ่าน JavaScript (ป้องกัน XSS)
                secure: true,
                sameSite:'strict' // ป้องกันส่ง Cookie ข้าม Domain
            })
            res.json({message:"Logout Fail",login:false})
    
    }
catch (err) {
    console.log(err);
    return res.json({
      message: err.message

    });
  }
};


export const getMember = async (req, res) => {
  console.log("GET /member is requested.");
  const token = req.cookies.token
  if(!token){
      return res.json({
        message:"No Member",login:false
      })
    }
  try {
    const secret_key = process.env.SECRET_KEY
    const  member = jwt.verify(token,secret_key)
    console.log(member)
    return res.json({
      memEmail:member.memEmail,
      memName:member.memName,
      dutyId:member.dutyId,
      login:true
    })



    }

  catch (err) {
    console.log(err);
    return res.json({
      message: "The information was falsified",
      login: false,
    });
  }
};

export const postMember = async (req, res) => {
  console.log("POST /member is requested.");
  try {
    const bodyData = req.body;
    if (!bodyData.memEmail || !bodyData.memName) {
      return res.json({
        message: " Error memEmail and memName is required",regist:false
      });
    }
    const chkRow = await database.query({
      text: `SELECT * FROM members WHERE "memEmail" = $1`,
      values: [req.body.memEmail],
    });
    if (chkRow.rowCount != 0) {
      return res.json({
        message: `ERROR memEmail ${req.body.memEmail} is  exists`,regist:false
      });
    }

    const pwd = req.body.password
    const saltround = 11
    const pwdHash = await bcrypt.hash(pwd,saltround)

    const result = await database.query({
      text: `INSERT INTO "members" ("memEmail","memName","memHash") VALUES($1,$2,$3)`,
      values: [
        req.body.memEmail,
        req.body.memName,
        pwdHash,

   
      ],
    });
    bodyData.createDate = new Date()
    bodyData.message = "Regist Success";
    bodyData.regist = true;
    res.json(bodyData);

  } catch (err) {
    console.log(err);
    return res.json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export const loginMember = async (req, res) => {
  console.log("POST /login is requested.");
  try {
    const bodyData = req.body;
    if (!bodyData.loginName || !bodyData.password) {
      return res.json({
        message: " Error Email and Password is required",
      });
    }
    const result = await database.query({
      text: `SELECT * FROM members WHERE "memEmail"=$1`,
      values: [req.body.loginName],
    });
    if (result.rowCount == 0) {

      return res.json({
        message: `ERROR Login fail `,
        login:false
      });
    }

    const loginOk = await bcrypt.compare(req.body.password,result.rows[0].memHash)
    //login สำเร็จแล้ว
    if(loginOk){
                 // ********สร้าง Token****
            // กำหนด Payload ของ Token
            const theuser={
                memEmail:result.rows[0].memEmail,
                memName:result.rows[0].memName,
                dutyId:result.rows[0].dutyId
            }
            const secret_key=process.env.SECRET_KEY //อ่านค่าจาก ENV
            const token = jwt.sign(theuser,secret_key,{expiresIn:'1h'}) //สร้าง Token
            // สร้าง Cookie
            res.cookie('token',token,{
                maxAge:3600000, //3,600,000 ms --> 60 minute -->1hr,
                httpOnly: true, // ป้องกันการเข้าถึง Token ผ่าน JavaScript (ป้องกัน XSS)
                secure: true,
                sameSite:'strict' // ป้องกันส่ง Cookie ข้าม Domain
            })
            res.json({message: `Login Success`,login:true})
    
    }
    else{
      res.clearCookie('token',{
                // maxAge:3600000, //3,600,000 ms --> 60 minute -->1hr,
                httpOnly: true, // ป้องกันการเข้าถึง Token ผ่าน JavaScript (ป้องกัน XSS)
                secure: true,
                sameSite:'strict' // ป้องกันส่ง Cookie ข้าม Domain
            })
        res.json({
            message:"Login Fail",login:false
        })
    }


  } catch (err) {
    console.log(err);
    return res.json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};