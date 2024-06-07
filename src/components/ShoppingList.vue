<template>
  <div class="shoppingList" v-if="items.length > 0">
    <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
      <thead>
        <tr>
          <th class="mdl-data-table__cell--non-numeric">Artikel</th>
          <th>Anzahl</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <!-- product name -->
          <td class="product-column mdl-data-table__cell--non-numeric">
            <span v-if="item.name !== 'Bier'">{{ item.name }}</span>
            <Chip v-if="item.name === 'Bier'" :text="item.name" />
          </td>
          <!-- product quantity -->
          <td>{{ item.quantity }}</td>
          <td class="date-column">
            <Chip v-if="isDateNow(item.date)" :text="formattedDate(item.date)" />
            <span v-if="!isDateNow(item.date)">
              {{ formattedDate(item.date) }}
            </span>
          </td>
          <!-- Action button -->
          <td>
            <ActionButton @click="removeFromListAction(index)">close</ActionButton>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="removeAllButtonContainer">
      <ButtonComponent @click="removeAllFromListAction()" :buttonType="ButtonTypes.PRIMARY"
        >Liste löschen</ButtonComponent
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import ButtonComponent from './ButtonComponent.vue'
import ActionButton from './ActionButton.vue'
import Chip from './Chip.vue'
import { ButtonTypes } from '../types/ButtonTypes'
import type { ShoppingItem } from '../views/ShoppingListView.vue'

interface Props {
  items: ShoppingItem[]
  removeFromListAction: Function
  removeAllFromListAction: Function
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'click'): void }>()

const formattedDate = (date: Date) => {
  return date
    ? new Date(date).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    : ''
}

const isDateNow = (date: Date) => {
  const convertedDate = new Date(date)
  let isDateNowAsBoolean = false
  if (date) {
    const today = new Date()
    isDateNowAsBoolean =
      convertedDate.getDate() == today.getDate() &&
      convertedDate.getMonth() == today.getMonth() &&
      convertedDate.getFullYear() == today.getFullYear()
  }
  return isDateNowAsBoolean
}

// const handleClick = (index: number) => {
//     emit('click')
// }
</script>

<style lang="scss" scoped>
.shoppingList {
  table {
    width: 100%;
  }
  .removeAllButtonContainer {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
  }
  @media only screen and (max-width: 600px) {
    .product-column {
      white-space: normal;
    }
    .date-column {
    display: none;
  }
}

}
</style>
