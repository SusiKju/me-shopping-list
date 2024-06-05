// TODO::: Describing https://vuejs.org/api/sfc-script-setup
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import InputComponent from '../components/InputComponent.vue'
import { ButtonTypes } from '../types/ButtonTypes'
import { InputTypes } from '../types/InputTypes'

interface ShoppingItem {
  name: string
  quantity: number
}
const prohibitedProduct = 'Bier'
const newItem = ref<string>('')
const newQuantity = ref<number>(1)
const items = ref<ShoppingItem[]>([])

let showStaticHint = false
let showDynamicHint = false


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
  if (newItem.value.includes(prohibitedProduct)) {
    showDynamicHint = true
  } else {
    showDynamicHint = false
  }
})
watch(
  () => items,
  () => {
    const alcoholItem = items.value.find((item) => (item.name === prohibitedProduct))
    if (alcoholItem?.name && alcoholItem?.name.length > 0) {
      showStaticHint = true
    } else {
      showStaticHint = false
    }
  },
  {
    deep: true
  }
)

onMounted(loadItems)
</script>

<template>
  <div class="shoppingList">
    <InputComponent
      id="product"
      :inputType="InputTypes.TEXT"
      v-model="newItem"
      @keyup.enter="addItem"
      placeholder="Add item"
      label="Produkt"
    />
    <div class="mdl-textfield mdl-js-textfield">
      <input
        type="text"
        v-model.number="newQuantity"
        @keyup.enter="addItem"
        class="mdl-textfield__input"
        pattern="-?[0-9]*(\.[0-9]+)?"
      />
      <label class="mdl-textfield__label" for="sample2">Number...</label>
      <span class="mdl-textfield__error">Input is not a number!</span>
      <span class="mdl-textfield__error">Input is not a number!</span>
    </div>
    <ButtonComponent @click="addItem" :buttonType="ButtonTypes.PRIMARY">Hinzufügen</ButtonComponent>

    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item.name }} - {{ item.quantity }}
        <ButtonComponent @click="removeItem(index)" :buttonType="ButtonTypes.SECONDARY">löschen</ButtonComponent>
      </li>
    </ul>
  </div>

  <ButtonComponent @click="removeAll" :buttonType="ButtonTypes.SECONDARY">Liste löschen</ButtonComponent>

  <div class="demo-card-wide mdl-card mdl-shadow--2dp" v-if="showDynamicHint || showStaticHint">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text">Hinweis</h2>
    </div>
    <div class="mdl-card__supporting-text">Du darfst dieses Produkt nicht hinzufügen!</div>
    <div class="mdl-card__actions mdl-card--border">
      <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
        Frage Deinen Papa!
      </a>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .shoppingList {
  }
}
</style>
