<template>
  <div>
    <div class="mdc-touch-target-wrapper red">
      <button class="mdl-button mdl-js-button mdl-button--raised" :class="classObject">
        <slot />
      </button>
    </div>
  </div>
</template>

<script>
import { ButtonTypes } from '../../types/ButtonTypes'
export default {
  name: 'ME-Button',
  props: {
    buttonType: {
      type: String,
      enum: ButtonTypes,
      default: ButtonTypes.PRIMARY
    },
    disabled: {
      type: Boolean,
      default: false
    },
    link: {
      type: [String, Boolean],
      default: false
    },
    target: {
      type: [String, Boolean],
      default: false
    },
    type: {
      type: [String, Boolean],
      default: false
    },
    isBlock: {
      type: [Boolean],
      default: false
    },
    value: {
      type: [String, Boolean],
      default: false
    }
  },
  computed: {
    classObject: function () {
      return this.buttonType === ButtonTypes.PRIMARY
        ? 'mdl-button--accent'
        : this.buttonType === ButtonTypes.SECONDARY
          ? 'mdl-button--colored'
          : 'mdl-button--accent'
    },

    linkComponentTag() {
      return true
    }
  }
}
</script>

<style lang="scss" scoped></style>
