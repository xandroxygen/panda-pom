<template>
  <div class="is-flex-centered has-text-centered">
    <document-title :title="title"></document-title>
    <img class="logo" src="~/assets/panda.png"/>
    <h1 class="title page-title">PandaPom</h1>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import DocumentTitle from "./document-title.vue";

export default {
  components: {
    DocumentTitle
  },
  computed: {
    parsedTime() {
      const min = Math.floor(this.time / 60);
      const sec = this.time % 60;
      const prettyMin = min < 10 ? `0${min}` : min;
      const prettySec = sec < 10 ? `0${sec}` : sec;
      return `${prettyMin}:${prettySec}`;
    },
    title() {
      return this.isBlockStateActive && this.shouldShowTimerInTitle
        ? `(${this.parsedTime}) PandaPom`
        : `PandaPom`;
    },
    shouldShowTimerInTitle() {
      return this.$store.state.preferences.shouldShowTimerInTitle;
    },
    ...mapGetters(["isBlockStateActive"]),
    ...mapState(["time"])
  }
};
</script>

<style>
.logo {
  height: 4rem;
}
.page-title {
  font-size: 3rem;
  font-weight: 300;
  padding: 1rem;
}
</style>

