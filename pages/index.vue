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