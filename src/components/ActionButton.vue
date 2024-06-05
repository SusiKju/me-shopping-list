<template>
  <button
    @click="handleClick"
    class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
  >
    <i class="material-icons"><slot /></i>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Props {}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'click'): void }>()

const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>
