<template>
  <button
    @click="handleClick"
    class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
  >
    <i class="material-icons"><slot /></i>
  </button>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits<{ (e: 'click'): void }>()

const handleClick = () => {
  emit('click')
}

</script>
