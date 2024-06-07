<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const loadScript = () => {
  const timestamp = Date.now()
  let recaptchaScript = document.createElement('script')
  recaptchaScript.setAttribute('src', 'https://code.getmdl.io/1.3.0/material.min.js?v=' + timestamp)
  document.head.appendChild(recaptchaScript)
}

onMounted(loadScript)
</script>

<template>
  <header>
    <nav>
      <!-- <RouterLink to="/">Move Elvator Shopping List</RouterLink> -->
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
