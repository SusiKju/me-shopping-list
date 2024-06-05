<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--4-col">
      <InputComponent
        id="product"
        :inputType="InputTypes.TEXT"
        v-model="newItem"
        @keyup.enter="addItem"
        label="Produkt"
      />
    </div>
    <div class="mdl-cell mdl-cell--4-col">
      <InputComponent
        id="quantity"
        :inputType="InputTypes.NUMBER"
        v-model="newQuantity"
        @keyup.enter="addItem"
        label="Anzahl"
        pattern="-?[0-9]*(\.[0-9]+)?"
      />
    </div>
    <div class="mdl-cell mdl-cell--4-col">
      <ButtonComponent @click="addItem" :buttonType="ButtonTypes.SECONDARY"
        >Hinzufügen</ButtonComponent
      >
    </div>
    <div class="mdl-cell mdl-cell--12-col">
      <ShoppingList
        :items="items"
        :removeFromListAction="removeItem"
        :removeAllFromListAction="removeAll"
      />
    </div>
    showDynamicHint : {{ showDynamicHint }}
    <br />
    showStaticHint: {{ showStaticHint }}

    <div v-if="showDynamicHint || showStaticHint" class="mdl-cell mdl-cell--12-col">
      <Card hd="Hinweis" bd="Du darfst dieses Produkt nicht hinzufügen! Frage zuerst Deinen Papa" :ft="newItem" />
    </div>
  </div>
</template>

// TODO::: Describing https://vuejs.org/api/sfc-script-setup
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

// Workaround: module has no default export
import ButtonComponent from '../components/ButtonComponent.vue'
import InputComponent from '../components/InputComponent.vue'
import ShoppingList from '../components/ShoppingList.vue'
import Card from '../components/Card.vue'
import { ButtonTypes } from '../types/ButtonTypes'
import { InputTypes } from '../types/InputTypes'

export interface ShoppingItem {
  name: string
  quantity: number
}
const prohibitedProduct = 'Bier'
const newItem = ref<string>('')
const newQuantity = ref<number>(1)
const items = ref<ShoppingItem[]>([])

let showStaticHint = ref<Boolean>(false)
let showDynamicHint = ref<Boolean>(false)

const loadItems = () => {
  const savedItems = localStorage.getItem('shopping-list')
  if (savedItems) {
    items.value = JSON.parse(savedItems)
  }
}

const saveItems = () => {
  localStorage.setItem('shopping-list', JSON.stringify(items.value))
}

const addItem = () => {
  if (newItem.value.trim() !== '' && newQuantity.value > 0) {
    items.value.push({ name: newItem.value.trim(), quantity: newQuantity.value })
    newItem.value = ''
    saveItems()
  }
}

const removeItem = (index: number) => {
  items.value.splice(index, 1)
  saveItems()
}

const removeAll = () => {
  items.value.splice(0, items.value.length)
  saveItems()
}

watch(newItem, () => {
  showDynamicHint.value = newItem.value.includes(prohibitedProduct)
})
watch(
  () => items,
  () => {
    showStaticHint.value = items.value.find((item) => item.name === prohibitedProduct)
      ? true
      : false
  },
  {
    deep: true
  }
)

onMounted(loadItems)
</script>
