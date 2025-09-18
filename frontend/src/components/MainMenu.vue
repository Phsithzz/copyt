<template>
  <nav class="navbar navbar-expand-lg bg-success ">
    <div class="container-fluid">
      <a class="navbar-brand text-white fw-bold" href="# ">Kushop</a>
      <button
        class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link text-white">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/product" class="nav-link text-white">Product</router-link>
          </li>
                    <li class="nav-item" v-if="login">
            <router-link to="/pagemember" style="text-decoration: none">
              <div class="nav-link fw-bold text-white">{{ memName }}</div>
            </router-link>
          </li>
          <li class="nav-item " v-if="login">
            <a href="#" @click="memLogout()" style="text-decoration: none">
              <div class="nav-link fw-bold text-white">ลงชื่อออก</div>
            </a>
          </li>
          <li class="nav-item" v-if="!login">
            <router-link to="/login" style="text-decoration: none">
              <div class="nav-link text-white">Login</div>
            </router-link>
          </li>
       
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { onMounted, ref,watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import axios from "axios";
axios.defaults.withCredentials = true;

const authStore = useAuthStore()
const router = useRouter()
const member = ref(null);
const memEmail = ref(null);
const memName = ref(null);
const dutyId = ref(null);
const login = ref(false)

watch(()=>authStore.isLogin,(newValue,oldValue)=>{
  console.log("Watch")
  getMember()
})
onMounted(async () => {
  await getMember();
});


const getMember = async () => {
  await axios
    .get(`http://localhost:3000/members/detail`)
    .then((res) => {
      member.value = res.data;
      memEmail.value = member.value.memEmail;
      memName.value = member.value.memName;
      dutyId.value = member.value.dutyId;
      login.value = member.value.login
    })
    .catch((err) => console.log(err.message)); //ถ้าผิดพลาดแสดง err
};

const memLogout = async () => {
  const cf = window.confirm("ต้องการออกจากระบบ?");
  if (cf) {
    try {
      console.log(  authStore.isLogin)
      const response = await axios.get(`http://localhost:3000/members/logout`);
      authStore.logout()  
      getMember()
      router.push("/");
      // window.location.reload()
    } catch (err) {
      console.log(err);
    }
  }
};

</script>
<style></style>