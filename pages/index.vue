<template>
  <div class="container">
    <page-title :title="pageTitle"></page-title>
    <div class="is-flex-centered has-text-centered">
      <img class="logo" src="~/assets/panda.png"/>
      <h1 class="title page-title">PandaPom</h1>
    </div>
    <div class="is-flex-centered">
      <h1 class="is-huge is-number">{{parsedTime}}</h1>
    </div> 
    <progress-tracker class="is-flex-centered" :expected="goal" :actual="completed" :is-active="isPomActive"></progress-tracker>
    <div class="level">
      <div class="level-left">
        <div class="level-item has-text-centered">
          <div class="has-small-h-pad">
            <p class="heading">Goal Today</p>
            <div class="field">
              <div class="control">
                <input class="input title has-text-centered" type="number" min="1" max="16" :value="goal" @change="changeGoal">
              </div>
            </div>
          </div>
          <div class="buttons">
            <span @click="toggleBlock" class="button is-large is-primary"><font-awesome-icon :icon="startStopIcon" size="lg" /></span>
            <span @click="resetBlock" class="button is-large is-info"><font-awesome-icon icon="redo" size="lg" /></span>
          </div>
        </div>
      </div>
      <div class="level-right">
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
      </div>
    </div>
    <div class="overlay-container">
      <div class="level overlay">
        <div class="level-left">
          <div class="level-item">
            <div class="button is-medium"  @click="togglePreferences" @mouseover="togglePrefTitle" @mouseout="showPrefTitle = false">
              <font-awesome-icon class="settings icon" icon="cog"/>
            </div>
          </div>
          <div class="level-item" :class="fadePrefTitle">
              <span class="is-size-4">Show Preferences</span>
            </div>
        </div>
      </div>
      <div class="pane" :class="animatePreferences">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <div class="button is-medium is-spacer">
                <font-awesome-icon class="settings icon" icon="cog"/>
              </div>
            </div>
            <div class="level-item">
              <span class="is-size-4">Preferences</span>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" v-model="autostart">
              Auto-start pomodoros and breaks?
            </label>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" v-model="shouldShowTimerInTitle">
              Show timer in page title?
            </label>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" v-model="shouldNotify">
              Browser notifications?
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bulma/css/bulma.css";
import * as blockTypes from "../assets/blockTypes.js";
import * as state from "../assets/state.js";
import PageTitle from "../components/page-title.vue";
import ProgressTracker from "../components/progress-tracker.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPause,
  faRedo,
  faPlay,
  faCog
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPause, faRedo, faPlay, faCog);

const POMODORO_TIME = 5; // 25 * 60;
const LONG_BREAK_TIME = 4; // 10 * 60;
const SHORT_BREAK_TIME = 3; // 5 * 60;

export default {
  components: {
    PageTitle,
    ProgressTracker,
    FontAwesomeIcon
  },
  data() {
    return {
      completed: 8,
      goal: 10,
      time: POMODORO_TIME,
      blockType: blockTypes.POMODORO,
      state: state.IDLE,
      interval: false,
      shouldNotify: true,
      autostart: true,
      shouldShowTimerInTitle: true,
      breakCounter: 0,
      showPreferences: false,
      showPrefTitle: false,
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
      return this.state === state.ACTIVE && this.shouldShowTimerInTitle
        ? `(${this.parsedTime}) PandaPom`
        : `PandaPom`;
    },
    isPomActive() {
      return (
        this.blockType === blockTypes.POMODORO &&
        (this.state === state.ACTIVE || this.state === state.STOPPED)
      );
    },
    startStopIcon() {
      return this.state === state.ACTIVE ? "pause" : "play";
    },
    fadePrefTitle() {
      return {
        "fade-in-left": this.showPrefTitle,
        "fade-out-left": !this.showPrefTitle
      };
    },
    prefTitleText() {
      return this.showPreferences ? "Preferences" : "Show Preferences";
    },
    animatePreferences() {
      return {
        "reveal-top-left": this.showPreferences,
        "hide-top-left": !this.showPreferences
      };
    }
  },
  methods: {
    togglePreferences() {
      this.showPreferences = !this.showPreferences;
      if (this.showPreferences) {
        this.showPrefTitle = false;
      }
    },
    togglePrefTitle() {
      this.showPrefTitle = true;
      if (this.showPreferences) {
        this.showPrefTitle = false;
      }
    },
    toggleBlock() {
      if (this.state === state.ACTIVE) {
        this.stopBlock();
      } else {
        this.startBlock();
      }
    },
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
      const v = parseInt(value || "0");
      this.goal = v > 0 ? v : 1;
    },
    async notify(body) {
      if (this.shouldNotify) {
        const notification = new Notification("PandaPom", {
          body
        });
        return new Promise((resolve, reject) => {
          const finish = () => {
            notification.close.bind(notification);
            resolve();
          };
          setTimeout(finish, 4000);
          notification.onclick = finish;
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
    },
    useStoredValueOrDefault(name) {
      const value = localStorage.getItem(name);
      const parsed = value && JSON.parse(value);
      return parsed !== undefined ? parsed : this[name];
    }
  },

  watch: {
    autostart(value) {
      localStorage.setItem("autostart", JSON.stringify(value));
    },
    shouldNotify(value) {
      localStorage.setItem("shouldNotify", JSON.stringify(value));
      if (value && Notification.permission !== "granted") {
        Notification.requestPermission();
      }
    },
    shouldShowTimerInTitle(value) {
      localStorage.setItem("shouldShowTimerInTitle", JSON.stringify(value));
    }
  },
  async mounted() {
    this.autostart = this.useStoredValueOrDefault("autostart");
    this.shouldShowTimerInTitle = this.useStoredValueOrDefault(
      "shouldShowTimerInTitle"
    );

    this.shouldNotify = this.useStoredValueOrDefault("shouldNotify");
    if (this.shouldNotify && Notification.permission !== "granted") {
      const result = await Notification.requestPermission();
      this.shouldNotify = result === "granted";
    }
  }
};
</script>

<style lang="css">
.has-small-h-pad {
  padding: 0 0.5rem;
}
.is-huge {
  font-size: 10rem;
}
.is-number {
  font-family: "Arial", monospace;
}
.input.title {
  width: 5.5rem;
  height: inherit;
  padding-top: 0px;
  padding-bottom: 0px;
  line-height: 1;
}
.logo {
  height: 4rem;
}
.page-title {
  font-size: 3rem;
  font-weight: 300;
  padding: 1rem;
}
.is-flex-centered {
  display: flex;
  justify-content: center;
  align-items: center;
}
.settings.icon {
  color: #00d1b2;
  pointer-events: none;
}
.pane {
  border-radius: 0.5rem;
  width: 20rem;
  padding: 0.5rem;
  background-color: hsl(0, 0%, 96%);
}
.overlay-container {
  position: relative;
}
.overlay {
  position: absolute;
  padding: 0.5rem;
  z-index: 2;
}
.is-spacer {
  visibility: hidden;
}
.fade-in-left {
  -webkit-animation: fade-in-left 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-in-left 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  pointer-events: none;
}
.reveal-top-left {
  transform-origin: left;
  animation: reveal-text cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.3s forwards;
}
.hide-top-left {
  transform-origin: left;
  animation: hide-text cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.3s forwards;
}
.reveal-color {
  transform-origin: left;
  animation: reveal-color cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.3s forwards;
}
.hide-color {
  transform-origin: left;
  animation: hide-color cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.3s forwards;
}
/* ----------------------------------------------
 * Generated by Animista on 2018-7-26 14:57:53
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation fade-in-left
 * ----------------------------------------
 */
@-webkit-keyframes fade-in-left {
  0% {
    -webkit-transform: translateX(-10px);
    transform: translateX(-10px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes fade-in-left {
  0% {
    -webkit-transform: translateX(-10px);
    transform: translateX(-10px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
.fade-out-left {
  -webkit-animation: fade-out-left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: fade-out-left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
/* ----------------------------------------------
 * Generated by Animista on 2018-7-26 15:7:42
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation fade-out-left
 * ----------------------------------------
 */
@-webkit-keyframes fade-out-left {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(-10px);
    transform: translateX(-10px);
    opacity: 0;
  }
}
@keyframes fade-out-left {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(-10px);
    transform: translateX(-10px);
    opacity: 0;
  }
}
@keyframes reveal-text {
  from {
    clip-path: inset(0 100% 100% 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}
@keyframes hide-text {
  from {
    clip-path: inset(0 0 0 0);
  }
  to {
    clip-path: inset(0 100% 100% 0);
  }
}
@keyframes reveal-color {
  from {
    background-color: white;
  }
  to {
    background-color: hsl(0, 0%, 96%);
  }
}
@keyframes hide-color {
  from {
    background-color: hsl(0, 0%, 96%);
  }
  to {
    background-color: white;
  }
}
</style>