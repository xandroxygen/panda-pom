<template>
  <div class="container">
    <page-title :title="pageTitle"></page-title>
    <h1 class="title">PandaPom</h1>
    <div class="level">
      <div class="level-item has-text-centered">
        <div class="has-small-h-pad">
          <p class="heading">Completed</p>
          <p class="title">{{completed}}</p>
        </div>
        <div class="has-small-h-pad">
          <p class="heading">Goal Today</p>
          <div class="field">
            <div class="control">
              <input class="input title has-text-centered" type="text" :value="goal" @input="changeGoal">
            </div>
          </div>
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
import * as state from "../assets/state.js";
import PageTitle from "../components/page-title.vue";

const POMODORO_TIME = 5; // 25 * 60;
const LONG_BREAK_TIME = 4; // 10 * 60;
const SHORT_BREAK_TIME = 3; // 5 * 60;

export default {
  components: {
    PageTitle
  },
  data() {
    return {
      completed: 0,
      goal: 10,
      time: POMODORO_TIME,
      blockType: blockTypes.POMODORO,
      state: state.IDLE,
      interval: false,
      shouldNotify: false,
      autostart: true,
      breakCounter: 0,
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
    },
    pageTitle() {
      return this.state === state.ACTIVE
        ? `(${this.parsedTime}) PandaPom`
        : `PandaPom`;
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
      if (this.state === state.ACTIVE) {
        return;
      }

      this.interval = setInterval(() => {
        this.time -= 1;
        if (this.time <= 0) {
          this.stopBlock();
          this.completeBlock();
        }
      }, 1000);
      this.state = state.ACTIVE;
    },
    async completeBlock() {
      this.state = this.autostart ? state.TRANSITION : state.IDLE;

      if (this.blockType === blockTypes.POMODORO) {
        this.completed += 1;
        const message =
          this.completed === this.goal
            ? "You achieved your goal! 🙌🏻 "
            : "Pomodoro completed! 🚀 ";
        await this.notify(message);
      } else {
        await this.notify("Your break is over, back to work!");
      }

      if (this.autostart && this.state === state.TRANSITION) {
        this.nextBlockType();
        this.resetBlock();
        this.startBlock();
      } else if (this.state !== state.TRANSITION) {
        this.resetBlock();
      }
    },
    stopBlock() {
      if (this.state === state.ACTIVE) {
        clearInterval(this.interval);
        this.state = state.STOPPED;
      } else if (this.state === state.TRANSITION) {
        this.state = state.IDLE;
      }
    },
    resetBlock() {
      this.state = state.IDLE;
      this.time =
        this.blockType === blockTypes.POMODORO
          ? POMODORO_TIME
          : this.blockType === blockTypes.LONG_BREAK
            ? LONG_BREAK_TIME
            : SHORT_BREAK_TIME;
    },
    changeGoal({ target: { value } }) {
      this.goal = parseInt(value || "0");
    },
    async notify(body) {
      if (this.shouldNotify) {
        const notification = new Notification("PandaPom", {
          body
        });
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            notification.close.bind(notification);
            resolve();
          }, 4000);
          notification.onclick = () => resolve();
        });
      }
      return Promise.resolve();
    },
    nextBlockType() {
      if (this.blockType === blockTypes.POMODORO) {
        if (this.breakCounter === 3) {
          this.breakCounter = 0;
          this.blockType = blockTypes.LONG_BREAK;
        } else {
          this.breakCounter += 1;
          this.blockType = blockTypes.SHORT_BREAK;
        }
      } else {
        this.blockType = blockTypes.POMODORO;
      }
    }
  },
  async mounted() {
    if (Notification.permission !== "granted") {
      const result = await Notification.requestPermission();
      this.shouldNotify = result === "granted";
    } else {
      this.shouldNotify = true;
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
.input.title {
  width: 5.5rem;
  height: inherit;
  padding-top: 0px;
  padding-bottom: 0px;
}
.is-flex-centered {
  display: flex;
  justify-content: center;
}
</style>


