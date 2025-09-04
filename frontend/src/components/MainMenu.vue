<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Kushop</a>
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
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/product" class="nav-link">Product</router-link>
          </li>
          <li class="nav-item">
             <router-link to="/login" class="nav-link">Login</router-link>
          </li>
       
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup></script>
<style></style>