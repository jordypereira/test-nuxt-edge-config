<template>
  <div>
    <h1>All Cookies</h1>
    <ul>
      <li v-for="cookie in allCookies" :key="cookie">{{ cookie }}</li>
    </ul>
  
  </div>
</template>

<script lang="ts" setup>
const allCookies = ref<string[]>([])


onMounted(() => {
  allCookies.value = document.cookie.split(';')
})
</script>

<style scoped>

</style>
