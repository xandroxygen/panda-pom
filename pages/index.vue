<template>
  <div v-if="isLoading"></div>
  <div v-else class="container fade-in">
    <page-title></page-title>
    <timer :class="hasNonMobileClass('is-flex-between')" @toggle-toolbar="toggleToolbar" ></timer>
    <progress-tracker :class="hasMobileClass('has-large-h-pad')"></progress-tracker>
    <animator :when-true="['fade-in']" :when-false="['fade-out']" :condition="showToolbar">
      <toolbar></toolbar>
    </animator>
    <animator :when-true="['fade-in']" :when-false="['fade-out']" :condition="showToolbar">
      <preference-box :class="[hasMobileClass('is-flex-centered')]"></preference-box>
    </animator>
  </div>
</template>

<script>
import PageTitle from "../components/page-title.vue";
import ProgressTracker from "../components/progress-tracker.vue";
import Timer from "../components/timer.vue";
import Toolbar from "../components/toolbar.vue";
import PreferenceBox from "../components/preference-box.vue";
import Animator from "../components/animator.vue";
import mobileMixin from "../assets/mobileMixin";

export default {
  mixins: [mobileMixin],
  components: {
    Animator,
    PageTitle,
    ProgressTracker,
    Timer,
    Toolbar,
    PreferenceBox
  },
  data() {
    return {
      showToolbar: true,
      isLoading: true
    };
  },
  methods: {
    toggleToolbar() {
      this.showToolbar = !this.showToolbar;
    }
  },
  async mounted() {
    this.$store.dispatch("initialize");
    await this.$store.dispatch("preferences/initialize");
    this.showToolbar = this.$store.state.preferences.shouldShowToolbar;

    if (this.$mq === "mobile") {
      this.showToolbar = true;
    }

    await new Promise(resolve => setTimeout(resolve, 200));
    this.isLoading = false;
  }
};
</script>

<style lang="css">
.has-large-h-pad {
  padding: 0 3rem;
}
.is-flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.overlay-container {
  position: relative;
}
.overlay {
  position: absolute;
  padding: 0.5rem;
  z-index: 2;
}
</style>