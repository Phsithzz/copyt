<template>
    <div class="container">
        <h1>Member</h1>
        <p>{{ memEmail }}</p>
        <p>{{ memName }}</p>
        <p>{{ dutyId }}</p>
    </div>
</template>


<script setup>
import { onMounted,ref } from 'vue';
import axios from 'axios';
axios.defaults.withCredentials =true
const member=ref(null)
const memEmail=ref(null)
const memName=ref(null)
const dutyId=ref(null)
const login=ref(false)
onMounted(async ()=>{
    await getMember()
})
const getMember=async ()=>{
    await axios.get(`http://localhost:3000/members/detail`)
        .then((res)=>{
            member.value=res.data
            memEmail.value=member.value.memEmail
            memName.value=member.value.memName
            dutyId.value=member.value.dutyId
           login.value=member.value.login
        })
        .catch(err=>console.log(err.message)) //ถ้าผิดพลาดแสดง err
}
</script>
