<template>
  <div class="mdl-textfield mdl-js-textfield">
    <input
      class="mdl-textfield__input"
      :id="id"
      :type="inputType"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
      :disabled="disabled"
    />
    <label class="mdl-textfield__label" :for="id">{{label}}</label>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { InputTypes } from '../types/InputTypes'

interface Props {
  id: string
  label: string
  inputType?: InputTypes
  placeholder?: string
  modelValue: string
  disabled?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style lang="scss" scoped></style>
