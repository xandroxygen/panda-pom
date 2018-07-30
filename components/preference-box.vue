<template>
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
</template>

<script>
export default {
  data() {
    return {
      showPrefTitle: false,
      showPreferences: false
    };
  },
  computed: {
    autostart: {
      get() {
        return this.$store.state.preferences.autostart;
      },
      set(value) {
        this.$store.dispatch("preferences/setAutostart", { value });
      }
    },
    shouldNotify: {
      get() {
        return this.$store.state.preferences.shouldNotify;
      },
      set(value) {
        this.$store.dispatch("preferences/setShouldNotify", { value });
      }
    },
    shouldShowTimerInTitle: {
      get() {
        return this.$store.state.preferences.shouldShowTimerInTitle;
      },
      set(value) {
        this.$store.dispatch("preferences/setShouldShowTimer", { value });
      }
    },
    shouldShowToolbar: {
      get() {
        return this.$store.state.preferences.shouldShowToolbar;
      },
      set(value) {
        this.$store.dispatch("preferences/setShouldShowToolbar", { value });
      }
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
    hasMobileClass(c) {
      return { [c]: this.$mq === "mobile" };
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
    }
  },
  mounted() {
    if (this.$mq === "mobile") {
      this.showPreferences = true;
    }
  }
};
</script>

<style>
</style>

