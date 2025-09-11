import database from "../Services/database.js";
import bcrypt from "bcrypt"
export const postMember = async (req, res) => {
  console.log("POST /member is requested.");
  try {
    const bodyData = req.body;
    if (!bodyData.memEmail || !bodyData.memName) {
      return res.json({
        message: " Error memEmail and memName is required",
      });
    }
    const chkRow = await database.query({
      text: `SELECT * FROM members WHERE "memEmail"=$1`,
      values: [req.body.memEmail],
    });
    if (chkRow.rowCount != 0) {
      return res.json({
        message: `ERROR memEmail ${req.body.memEmail} is  exists`,
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
    const datetime = new Date();
    bodyData.createDate = datetime;
    bodyData.message = "OK";
    res.json(bodyData);
  } catch (err) {
    console.log(err);
    return res.json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};