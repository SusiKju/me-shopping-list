<template>
  <div class="input-component mdl-textfield mdl-js-textfield">
    <input
      class="mdl-textfield__input"
      :id="id"
      :type="inputType === InputTypes.DATE ? 'date' : 'text'"
      :placeholder="placeholder"
      :value="modelValue || initValue"
      @input="handleInput"
      :disabled="disabled"
      :pattern="pattern"
    />
    <label class="_mdl-textfield__label" :for="id">{{ label }}</label>
    <span class="mdl-textfield__error">Input is not a number!</span>
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
  pattern?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()
const initValue = props.inputType === InputTypes.NUMBER ? 1 : ''

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style lang="scss" scoped>
.input-component {
  label {
    font-size: 0.9rem;
    color: grey;
  }
}
</style>
