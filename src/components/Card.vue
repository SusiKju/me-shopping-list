<template>
  <div class="card">
    <div class="demo-card-wide mdl-card mdl-shadow--2dp">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">{{ hd }}</h2>
      </div>
      <div class="mdl-card__supporting-text">{{ bd }}</div>
      <div class="mdl-card__actions mdl-card--border">
        <h2 href="">{{ ft }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
interface Props {
  hd?: String
  bd?: String
  ft?: String
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
</style>
