<template>
  <div class="overlay-container">
    <div class="level is-mobile overlay" v-if="isNotMobile">
      <div class="level-left">
        <div class="level-item">
          <button class="button is-medium" :class="hasMobileClass('is-static')"  @click="togglePreferences" @mouseover="togglePrefTitle" @mouseout="showPrefTitle = false">
            <font-awesome-icon class="primary icon" icon="cog"/>
          </button>
        </div>
        <animator class="level-item" :condition="showPrefTitle" :when-true="['fade-in-left']" :when-false="['fade-out-left']">
            <span class="is-size-4">Show Preferences</span>
        </animator>
      </div>
    </div>
    <animator class="pane" :condition="showPreferences" :when-true="['reveal-top-left']" :when-false="['hide-top-left']">
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <button class="button is-medium is-static" :class="hasNonMobileClass('is-spacer')">
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
      <div class="field" v-if="hasNotifications">
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
    </animator>
  </div>
</template>

<script>
import mobileMixin from "../assets/mobileMixin";
import Animator from "../components/animator.vue";

export default {
  components: {
    Animator
  },
  mixins: [mobileMixin],
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
    prefTitleText() {
      return this.showPreferences ? "Preferences" : "Show Preferences";
    },
    hasNotifications() {
      return this.isNotMobile && typeof Notification !== undefined;
    },
    isNotMobile() {
      return this.$mq !== "mobile";
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
.pane {
  border-radius: 0.5rem;
  width: 20rem;
  padding: 0.5rem;
  background-color: hsl(0, 0%, 96%);
}
</style>

