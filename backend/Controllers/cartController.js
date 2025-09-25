import database from '../Services/database.js'

export const chkCart = async (req, res) => {
  console.log(`POST CART customer ${req.body.memEmail} is requested`);
  // ก่อนจะ Excuese Query ทำการ Validate Data ก่อน
  if (req.body.memEmail == null) {
    return res.json({  error: true, errormessage: "member Email is required"  });
  }


  const result = await database.query({
    text: `SELECT * FROM carts WHERE "cusId" = $1 AND "cartCf" !=true `,
    values: [req.body.memEmail],
  });
  if (result.rows[0] !=null) {
    return res.json({ cartExist: true,cartId:result.rows[0].cartId });
  } else {
    return res.json({ cartExist: false });
  }

  
};

export const postCart = async (req,res) =>{
     console.log(`POST /CART is requested `);
  // const bodyData=req.body
  try {
    // ก่อนจะ Excuese Query ทำการ Validate Data ก่อน
    if (req.body.cusId == null) {
      return res.json({ cartOK: false, messageAddCart: "Customer Id is required"  });
    }
    // Gen ID
    // จัดรูปแบบวันที่ YYYYMMDD
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // เดือนเริ่มจาก 0 ดังนั้นต้องบวก 1
    const day = String(now.getDate()).padStart(2, "0");
    const currentDate = `${year}${month}${day}`;


    let i = 0;
    let theId = "";
    let existsResult = [];
    // ทำการวน Loop หา id ที่ยังไม่มีในตะกร้า
    do {
      i++;
      theId = `${currentDate}${String(i).padStart(4, "0")}`;
      existsResult = await database.query({
        text: 'SELECT EXISTS (SELECT * FROM carts WHERE "cartId" = $1) ',
        values: [theId],
      });
    } while (existsResult.rows[0].exists);
    // ได้ id แล้ว ทำการบันทึกข้อมูลลงตะกร้า
    const result = await database.query({
      text: ` INSERT INTO carts ("cartId", "cusId", "cartDate")
                    VALUES ($1,$2,$3) `,
      values: [
        theId, //$1 รหัสที่ Gen มา
        req.body.cusId, //$2 รหัสที่ส่งมาจาก Frontend
        now, //$3 วันปัจจุบัน
      ],
    });

    return res.json({ cartOK: true, messageAddCart: theId });

  } catch (err) {
    return res.json({  cartOK: false,messageAddCart: err.message });
  }

}

export const postCartDtl = async(req,res)=>{
    console.log(`POST /CARTDETAIL is requested `);
  try {
    // ก่อนจะ Excuese Query ทำการ Validate Data ก่อน
    if (req.body.cartId == null || req.body.pdId == null || req.body.pdPrice == null) {
      return res.json({
        cartDtlOK: false,
        messageAddCartDtl: "CartId && ProductID  && Price  is required",
      });
    }
    // ดูว่ามี Product เดิมอยู่่หรือไม่
    const pdResult = await database.query({
      text: `  SELECT * FROM "cartDtl" ctd WHERE ctd."cartId" = $1 AND ctd."pdId" = $2 `,
      values: [req.body.cartId, req.body.pdId], //ค่า Parameter ที่ส่งมา
    });    
    if (pdResult.rowCount == 0) { // ถ้าไม่มีให้ INSERT
      try {
        const result = await database.query({
          text: ` INSERT INTO "cartDtl" ("cartId", "pdId", "qty","price")
                            VALUES ($1,$2,$3,$4) `,
          values: [req.body.cartId, req.body.pdId, 1, req.body.pdPrice],
        });
        return res.json({ cartDtlOK: true, messageAddCart: req.body.cartId });
      } catch (err) {
        return res.json({
          cartDtlOK: false,
          messageAddCartDtl: "INSERT DETAIL ERROR",
        });
      }
    } else { // ถ้ามีแล้วให้ UPDATE
      try {
        const result = await database.query({
          text: ` UPDATE "cartDtl" SET "qty" = $1
                            WHERE "cartId" = $2
                            AND "pdId" = $3 `,
          values: [pdResult.rows[0].qty + 1, req.body.cartId, req.body.pdId],
        });
        return res.json({ cartDtlOK: true, messageAddCart: req.body.cartId });
      } catch (err) {
        return res.json({
          cartDtlOK: false,
          messageAddCartDtl: "INSERT DETAIL ERROR",
        });
      }
    }
  } catch (err) {
    return res.json({
      cartDtlOK: false,
      messageAddCartDtl: "INSERT DETAIL ERROR",
    });
  }
}

