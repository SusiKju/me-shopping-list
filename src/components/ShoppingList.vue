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
          <td class="mdl-data-table__cell--non-numeric">
            <span v-if="item.name !== 'Bier'">{{ item.name }}</span>
            <ContactChip v-if="item.name === 'Bier'" :text="item.name" />
          </td>
          <td>{{ item.quantity }}</td>
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
import ContactChip  from './ContactChip.vue'
import { ButtonTypes } from '../types/ButtonTypes'
import type { ShoppingItem } from '../views/ShoppingListView.vue'

interface Props {
  items: ShoppingItem[]
  removeFromListAction: Function
  removeAllFromListAction: Function
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'click'): void }>()

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
}
</style>
