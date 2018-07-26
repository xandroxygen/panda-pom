<template>
  <div class="circle-container">
    <span class="circle" v-for="n in fullCircles" :key="n + 'full'"></span>
    <span class="circle" v-if="shouldShowHalfCircle">
      <span class="is-full-half"></span>
      <span class="is-empty-half"></span>
    </span>
    <span class="circle is-empty" v-for="n in emptyCircles" :key="n"></span>
    <span class="circle-text" v-if="extras > 0">{{`+${extras}`}}</span>
  </div>
</template>

<script>
export default {
  props: ["expected", "actual", "isActive"],
  computed: {
    fullCircles() {
      return Math.min(this.actual, this.expected);
    },
    shouldShowHalfCircle() {
      return this.isActive && this.actual < this.expected;
    },
    emptyCircles() {
      const leftover = this.expected - this.actual;
      const yeah = this.shouldShowHalfCircle ? leftover - 1 : leftover;
      return Math.max(yeah, 0);
    },
    extras() {
      return Math.max(this.actual - this.expected, 0);
    }
  }
};
</script>

<style>
.circle-container {
  display: flex;
  /* flex-direction: column-reverse; */
  padding-bottom: 1rem;
  flex-wrap: wrap;
}
.circle {
  width: 2rem;
  height: 2rem;
  background-color: #00d1b2;
  border-radius: 50%;
  border: 2px solid #00d1b2;
  margin: 0.25rem;
  overflow: hidden;
  display: flex;
}
.is-empty,
.is-empty-half {
  background-color: white;
}
.is-full-half,
.is-empty-half {
  display: inline-block;
  height: 2rem;
  width: 1rem;
}
.circle-text {
  line-height: 2.5rem;
  font-size: 1.5rem;
  color: #00d1b2;
  font-weight: bold;
}
</style>


