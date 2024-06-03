<template>
  <div>
    <h1>All Cookies</h1>
    <ul>
      <li v-for="cookie in allCookies" :key="cookie">{{ cookie }}</li>
    </ul>
  
  </div>
</template>

<script lang="ts" setup>
const allCookies = document.cookie.split(';').map(cookie => cookie.trim());
</script>

<style scoped>

</style>
