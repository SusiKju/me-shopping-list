<template>
  <h1>move:elevator - shopping list</h1>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--3-col">
      <InputComponent
        id="product"
        :inputType="InputTypes.TEXT"
        v-model="newItem"
        @keyup.enter="addItem"
        label="Produkt"
      />
    </div>
    <div class="mdl-cell mdl-cell--3-col">
      <InputComponent
        id="quantity"
        :inputType="InputTypes.NUMBER"
        v-model="newQuantity"
        @keyup.enter="addItem"
        label="Anzahl"
        pattern="-?[0-9]*(\.[0-9]+)?"
      />
    </div>
    <div class="mdl-cell mdl-cell--3-col">
      <InputComponent
        id="date"
        :inputType="InputTypes.DATE"
        v-model="newDate"
        @keyup.enter="addItem"
        label="*Datum"
      />
    </div>
    <div class="mdl-cell mdl-cell--3-col">
      <ButtonComponent @click="addItem" :buttonType="ButtonTypes.SECONDARY"
        >Hinzufügen</ButtonComponent
      >
    </div>
    <div class="mdl-cell mdl-cell--12-col">
      <ShoppingList
        :items="items"
        :removeFromListAction="removeItem"
        :removeAllFromListAction="removeAll"
        :checkAction="checkIt"
        :editAction="editItem"
      />
    </div>
    showDynamicHint : {{ showDynamicHint }}
    <br />
    showStaticHint: {{ showStaticHint }}

    <div v-if="showDynamicHint || showStaticHint" class="mdl-cell mdl-cell--12-col">
      <Card
        hd="Hinweis"
        bd="Du darfst dieses Produkt nicht hinzufügen! Frage zuerst Deinen Papa"
        :ft="newItem"
      />
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
  date?: Date
  isChecked?: Boolean
}

const LOCALE_STORAGE_ITEM = 'shopping-list'
const prohibitedProduct = 'Bier'
const newItem = ref<string>('')
const newQuantity = ref<number>(1)
const newDate = ref<Date>(new Date())
const newChecked = ref<Boolean>(false)
const items = ref<ShoppingItem[]>([])

let showStaticHint = ref<Boolean>(false)
let showDynamicHint = ref<Boolean>(false)

const loadItems = () => {
  const savedItems = localStorage.getItem(LOCALE_STORAGE_ITEM)
  if (savedItems) {
    items.value = JSON.parse(savedItems)
  }
}

const saveItems = () => {
  localStorage.setItem(LOCALE_STORAGE_ITEM, JSON.stringify(items.value))
}

const addItem = () => {
  if (newItem.value.trim() !== '' && newQuantity.value > 0) {
    items.value.push({
      name: newItem.value.trim(),
      quantity: newQuantity.value,
      date: newDate.value,
      isChecked: newChecked.value
    })
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

const checkIt = (index: number) => {
  // newChecked.value
  items.value[index].isChecked = !items.value[index].isChecked
  saveItems()
}

const editItem = (index: number) => {
  // Load it in form
  newItem.value = items.value[index].name
  newQuantity.value = items.value[index].quantity
  newDate.value = new Date(items.value[index].date)


  // TODO::: Replace date in form not working
  console.warn(222, items.value[index].date);
  console.warn(333, newDate.value);


  // Remove old item
  items.value.splice(index, 1)

  // items.value[index].isChecked = !items.value[index].isChecked
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
