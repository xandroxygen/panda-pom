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
          <span @click="startBlock" class="button is-success">Start</span>
          <span @click="stopBlock" class="button is-danger">Stop</span>
          <span @click="resetBlock" class="button is-info">Reset</span>
        </div>
      </div>
    </div>
    <div class="is-flex-centered">
      <h1 class="is-huge is-number">{{parsedTime}}</h1>
    </div> 
  </div>
</template>

<script>
import "bulma/css/bulma.css";
import * as blockTypes from "../assets/blockTypes.js";

const POMODORO_TIME = 25 * 60;
const LONG_BREAK_TIME = 10 * 60;
const SHORT_BREAK_TIME = 5 * 60;

export default {
  data() {
    return {
      completed: 0,
      goal: 10,
      time: POMODORO_TIME,
      blockType: blockTypes.POMODORO,
      isRunning: false,
      interval: false,
      POMODORO: blockTypes.POMODORO,
      SHORT_BREAK: blockTypes.SHORT_BREAK,
      LONG_BREAK: blockTypes.LONG_BREAK
    };
  },
  computed: {
    parsedTime() {
      const min = Math.floor(this.time / 60);
      const sec = this.time % 60;
      const prettySec = sec < 10 ? `0${sec}` : sec;
      return `${min}:${prettySec}`;
    }
  },
  methods: {
    changeBlockType(type) {
      this.blockType = type;
      this.resetBlock();
    },
    isBlockActive(type) {
      return { "is-primary is-selected is-outlined": this.blockType === type };
    },
    startBlock() {
      if (this.isRunning) {
        return;
      }

      this.interval = setInterval(() => {
        if (this.time <= 0) {
          this.completeBlock();
          this.resetBlock();
        }
        this.time -= 1;
      }, 1000);
      this.isRunning = true;
    },
    completeBlock() {
      if (this.blockType === blockTypes.POMODORO) {
        this.completed += 1;
      }
    },
    stopBlock() {
      if (!this.isRunning) {
        return;
      }
      clearInterval(this.interval);
      this.isRunning = false;
    },
    resetBlock() {
      this.stopBlock();
      this.time =
        this.blockType === blockTypes.POMODORO
          ? POMODORO_TIME
          : this.blockType === blockTypes.LONG_BREAK
            ? LONG_BREAK_TIME
            : SHORT_BREAK_TIME;
    }
  }
};
</script>

<style lang="css">
.has-small-h-pad {
  padding: 0 0.5rem;
}
.is-huge {
  font-size: 95px;
}
.is-number {
  font-family: "Arial", monospace;
}
.is-flex-centered {
  display: flex;
  justify-content: center;
}
</style>


