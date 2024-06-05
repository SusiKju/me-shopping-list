<template>
  <span class="mdl-chip mdl-color--yellow">
    <span class="mdl-chip__text">{{ text }}</span>
  </span>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
interface Props {
  text?: String
}

const props = defineProps<Props>()
</script>
