<template>
    <div class="mdc-touch-target-wrapper">
      <button
        @click="handleClick"
        class="mdl-button mdl-js-button mdl-button--raised"
        :class="classObject"
      >
      <slot />
      </button>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { ButtonTypes } from '../types/ButtonTypes'

interface Props {
  buttonType?: ButtonTypes
  placeholder?: string
  disabled?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'click'): void }>()

const handleClick = () => {
  emit('click')
}

const classObject =
  props.buttonType === ButtonTypes.PRIMARY
    ? 'mdl-button--accent'
    : props.buttonType === ButtonTypes.SECONDARY
      ? 'mdl-button--colored'
      : props.buttonType === ButtonTypes.TERTIARY
        ? ''
        : 'mdl-button--accent'
</script>
