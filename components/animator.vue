<template>
  <div :class="animationClasses">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    condition: {
      type: Boolean,
      required: true
    },
    whenTrue: {
      type: Array,
      default: []
    },
    whenFalse: {
      type: Array,
      default: []
    }
  },
  computed: {
    animationsWhenTrue() {
      return this.whenTrue.join(" ");
    },
    animationsWhenFalse() {
      return this.whenFalse.join(" ");
    },
    animationClasses() {
      return {
        [this.animationsWhenTrue]: this.condition,
        [this.animationsWhenFalse]: !this.condition
      };
    }
  }
};
</script>

<style>
</style>
