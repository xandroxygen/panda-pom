<template>
  <div class="container">
    <h1 class="title">PandaPom</h1>
    <div class="level">
      <div class="level-item has-text-centered">
        <div class="has-small-h-pad">
          <p class="heading">Completed</p>
          <p class="title">{{completed}}</p>
        </div>
        <div class="has-small-h-pad">
          <p class="heading">Goal Today</p>
          <p class="title">{{goal}}</p>
        </div>
      </div>
      <div class="level-item">
        <div class="buttons has-addons">
          <span 
            @click="changeBlockType(POMODORO)" 
            class="button" 
            :class="isBlockActive(POMODORO)"
          >Pomodoro</span>
          <span 
            @click="changeBlockType(SHORT_BREAK)" 
            class="button" 
            :class="isBlockActive(SHORT_BREAK)"
          >Short Break</span>
          <span 
            @click="changeBlockType(LONG_BREAK)" 
            class="button"
            :class="isBlockActive(LONG_BREAK)"
          >Long Break</span>
        </div>
      </div>
      <div class="level-item">
        <div class="buttons">
          <span class="button is-success">Start</span>
          <span class="button is-danger">Stop</span>
          <span class="button is-info">Reset</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bulma/css/bulma.css";
import * as blockTypes from "../assets/blockTypes.js";

export default {
  data() {
    return {
      completed: 4,
      goal: 10,
      time: 25 * 60,
      blockType: blockTypes.POMODORO,
      POMODORO: blockTypes.POMODORO,
      SHORT_BREAK: blockTypes.SHORT_BREAK,
      LONG_BREAK: blockTypes.LONG_BREAK
    };
  },
  methods: {
    changeBlockType(type) {
      this.blockType = type;
    },
    isBlockActive(type) {
      return { "is-primary is-selected is-outlined": this.blockType === type };
    }
  }
};
</script>

<style lang="css">
.has-small-h-pad {
  padding: 0 0.5rem;
}
</style>


