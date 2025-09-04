<template>
  <h1>ยินดีต้อนรับสู่ร้านค้าประจำเกษตรศาสตร์ศรีราชา</h1>
  <div class="row">
    <div v-for="(pd, pdId) in products" :key="pdId" class="col-lg-4 col-md-6 col-sm-12">
      <div class="card" style="width: 18rem;background-color:#EEEEEE;">
        <img :src="`http://localhost:3000/img_pd/${pd.pdId}.jpg`" class="card-img-top p-2" alt="" />
        <div class="card-body">
          <h5 class="card-title">{{ pd.pdName }}</h5>
          <p class="card-text">- {{ pd.pdPrice }}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import  axios  from 'axios'
import { onMounted, ref } from 'vue'; // import function ref มาจาก vue   
const products = ref([]) // ประกาศตัวแปร แบบ Composition API ใช้ function ref()
// เริ่มทำงานเมื่อเกิดการ mount Component
onMounted(async () => {
  // await fetch(`http://localhost:3000/products`) //ระบุ endpoint ดึงข้อมูลจาก Backend
  // .then(res=>res.json()) //ได้ค่า res ใช้ res เป็นParameter เรียก fn. แปลงเป็น JSON format
  // .then(data=>products.value=data) //ได้ data ใช้ data เป็นParameter กำหนดค่าให้ products
  // .catch(err=>console.log(err.message)) //ถ้าผิดพลาดแสดง err
  await axios.get(`http://localhost:3000/products/three`)
    .then((res) => {
      products.value = res.data
    })
    .catch(err => console.log(err.message))
})

</script>

<style scoped></style>
