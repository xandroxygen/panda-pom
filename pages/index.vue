<template>
  <div v-if="isLoading"></div>
  <div v-else class="container fade-in">
    <page-title :should-show-timer-in-title="shouldShowTimerInTitle"></page-title>
    <timer :class="hasNonMobileClass('is-flex-between')" @toggle-toolbar="toggleToolbar" ></timer>
    <progress-tracker class="is-flex-centered" :class="hasMobileClass('has-large-h-pad')" :expected="goal" :actual="completed" :is-active="isPomActive"></progress-tracker>
    <toolbar :class="animateToolbar"></toolbar>
    <div :class="[hasMobileClass('is-flex-centered'), animateToolbar]">
      <div class="overlay-container">
        <div class="level is-mobile overlay">
          <div class="level-left">
            <div class="level-item">
              <button class="button is-medium" :class="hasMobileClass('is-static')"  @click="togglePreferences" @mouseover="togglePrefTitle" @mouseout="showPrefTitle = false">
                <font-awesome-icon class="primary icon" icon="cog"/>
              </button>
            </div>
            <div class="level-item" :class="fadePrefTitle">
                <span class="is-size-4">Show Preferences</span>
              </div>
          </div>
        </div>
        <div class="pane" :class="animatePreferences">
          <div class="level is-mobile">
            <div class="level-left">
              <div class="level-item">
                <button class="button is-medium is-spacer">
                  <font-awesome-icon class="primary icon" icon="cog"/>
                </button>
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
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input type="checkbox" v-model="shouldShowToolbar">
                Show toolbar on page load?
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "../components/page-title.vue";
import ProgressTracker from "../components/progress-tracker.vue";
import Timer from "../components/timer.vue";
import Toolbar from "../components/toolbar.vue";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    PageTitle,
    ProgressTracker,
    Timer,
    Toolbar
  },
  data() {
    return {
      shouldNotify: true,
      autostart: true,
      shouldShowTimerInTitle: true,
      shouldShowToolbar: true,
      showPreferences: false,
      showPrefTitle: false,
      showToolbar: true,
      isLoading: true
    };
  },
  computed: {
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
    },
    animateToolbar() {
      return {
        "fade-in": this.showToolbar,
        "fade-out": !this.showToolbar
      };
    },
    ...mapState(["completed", "goal"]),
    ...mapGetters(["isPomActive"])
  },
  methods: {
    hasMobileClass(c) {
      return { [c]: this.$mq === "mobile" };
    },
    hasNonMobileClass(c) {
      return { [c]: this.$mq !== "mobile" };
    },
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
    toggleToolbar() {
      this.showToolbar = !this.showToolbar;
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
    useStoredValueOrSetDefault(name) {
      const value = localStorage.getItem(name);
      const parsed = value && JSON.parse(value);
      if (parsed === undefined || parsed === null) {
        localStorage.setItem(name, JSON.stringify(this[name]));
        return this[name];
      }
      return parsed;
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
    },
    shouldShowToolbar(value) {
      localStorage.setItem("shouldShowToolbar", JSON.stringify(value));
    }
  },
  async mounted() {
    try {
      this.autostart = this.useStoredValueOrSetDefault("autostart");
      this.shouldShowTimerInTitle = this.useStoredValueOrSetDefault(
        "shouldShowTimerInTitle"
      );
      this.shouldShowToolbar = this.useStoredValueOrSetDefault(
        "shouldShowToolbar"
      );
      this.showToolbar = this.shouldShowToolbar;

      this.shouldNotify = this.useStoredValueOrSetDefault("shouldNotify");
      if (this.shouldNotify && Notification.permission !== "granted") {
        const result = await Notification.requestPermission();
        this.shouldNotify = result === "granted";
      }

      if (this.$mq === "mobile") {
        this.showPreferences = true;
        this.showToolbar = true;
      }

      await new Promise(resolve => setTimeout(resolve, 200));
      this.isLoading = false;
    } catch (e) {
      this.shouldNotify = false;
      this.isLoading = false;
    }
  }
};
</script>

<style lang="css">
.has-small-h-pad {
  padding: 0 0.5rem;
}
.has-large-h-pad {
  padding: 0 3rem;
}
.input.title {
  width: 5.5rem;
  height: inherit;
  padding-top: 0px;
  padding-bottom: 0px;
  line-height: 1;
}
.is-flex-centered {
  display: flex;
  justify-content: center;
  align-items: center;
}
.is-flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.primary.icon {
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
.fade-out-left {
  -webkit-animation: fade-out-left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: fade-out-left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.fade-in {
  -webkit-animation: fade-in 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-in 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}
.fade-out {
  -webkit-animation: fade-out 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-out 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
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
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
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