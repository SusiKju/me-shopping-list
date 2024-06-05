<script setup lang="ts">
import Button from '../components/Button/Button.vue'
import { ButtonTypes } from '../types/ButtonTypes'
</script>

<template>
  <div class="shoppingList">
    <h1>Move:Elevator Shopping List</h1>


      <Button :buttonType="ButtonTypes.PRIMARY">You did it!</Button>
      <Button :buttonType="ButtonTypes.SECONDARY">You did it!</Button>
      <Button :buttonType="ButtonTypes.TERTIARY">You did it!</Button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .shoppingList {
    /* min-height: 100vh;
    display: flex;
    align-items: center; */
  }
}
</style>
