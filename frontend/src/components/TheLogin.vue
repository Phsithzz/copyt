<template>
    <div class="row mt-5">
      <div class="col-sm-12 col-md-6 col-lg-6 mb-5">
        <img src="../assets/LogoSRC.png" alt="" width="80%">
      </div>
      <div class="col-sm-12 col-md-6 col-lg-6 mb3">
        <!-- เมื่อสั่ง Submit ให้เรียก Function handleSubmit -->
        <form @submit.prevent="handleSubmit()">
          <div class="col-sm-12 col-md-10 col-lg-8">
            <div class="form-floating mb-3">
              <input class="form-control" type="email" id="loginName" v-model="loginName"
                autocomplete="off" required autofocus placeholder="loginName">
              <label for="loginName">loginName</label>
            </div>
          </div>
          <div class="col-sm-12  col-md-10 col-lg-8">
            <div class="form-floating mb-3">
              <input class="form-control" type="password" id="password" v-model="password"
                required placeholder="Password">
              <label for="password">Password</label>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12  col-md-6 mb-3">
              <a href="#" class="btn btn-outline-danger">
                <i class="bi bi-heart-fill"></i>&nbsp;ลงทะเบียนใหม่</a>
            </div>
            <div class="col-sm-12 col-md-6">
              <button class="btn btn-primary " type="submit" style="width: 6rem;">
                <i class="bi bi-check-lg"></i>&nbsp;ตกลง</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- ส่วนแสดงสถานะ จากการตอบกลับของ Backend -->
    <p v-if="login && message" class="alert alert-success ">
        เข้าระบบสำเร็จ-{{ message }}</p>
    <p v-else-if="!login && message" class="alert alert-danger">
        เข้าระบบผิดพลาด-{{ message }}</p>
</template>
<script setup>
    import { ref } from 'vue'; // import function ref มาจาก v
    import axios from 'axios';


    const loginName=ref(null)
    const password=ref(null)
    const login=ref(null)
    const message=ref(null)
    const handleSubmit =async()=>{
        let members={ // กำหนดค่า
           loginName:loginName.value, //ค่าที่ส่งให้ Backend
           password:password.value //ค่าที่ส่งให้ Backend
        }
        try { // Request POST Method
          const response = await axios.post(`http://localhost:3000/members/login`,members)
          console.log(response.data)
          login.value=response.data.login
          message.value=response.data.message
        }
        catch(err){
          console.log(err)
        }
    }
</script>