//import
import express from "express";
import database from "./Services/database.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import productRoute from './Routes/productRoute.js'
import memberRoute from './Routes/memberRoute.js'
import cartRoute from './Routes/cartRoute.js'

import cors from 'cors'
import cookieParser from "cookie-parser";
//use
const app = express();
dotenv.config();
//รับค่าข้อมูลมาแล้วแปลงเป็นjson
// เรียกใช้ cors
// app.use(cors())
// กำหนด Option ของ cors เพิ่มเติมเมื่อมีการส่งข้อมูล Cookie หรือ Header
app.use(cors({
    origin:['http://localhost:5173','http://127.0.0.1:5173'], //Domain ของ Frontend
    methods:['GET','POST','PUT','DELETE'], //Method ที่อนุญาต
    credentials:true  //ให้ส่งข้อมูล Header+Cookie ได้
}))

app.use("/img_pd",express.static("img_pd"))
app.use(bodyParser.json());
app.use(cookieParser())

app.use(productRoute)
app.use(memberRoute)
app.use(cartRoute)

//port
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
});
