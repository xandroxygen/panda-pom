<template>
  <div class="is-flex-centered">
      <button v-if="$mq !== 'mobile'" class="button is-medium is-spacer">
        <font-awesome-icon class="primary icon" icon="chevron-down"/>
      </button>
      <div class="has-large-t-pad has-med-v-pad">
        <h1 class="is-huge is-number" :class="hasMobileClass('is-less-huge')" @click="toggleBlock">{{parsedTime}}</h1>
        <progress class="progress is-small" :class="progressColor" :value="blockProgress" max="100">{{`${blockProgress}%`}}</progress> 
      </div>
      <button v-if="$mq !== 'mobile'" class="button is-medium show-button" @click="toggleToolbar">
        <font-awesome-icon class="primary icon" icon="chevron-down"/>
      </button>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  computed: {
    parsedTime() {
      const min = Math.floor(this.time / 60);
      const sec = this.time % 60;
      const prettyMin = min < 10 ? `0${min}` : min;
      const prettySec = sec < 10 ? `0${sec}` : sec;
      return `${prettyMin}:${prettySec}`;
    },
    blockProgress() {
      if (this.isBlockStateTransition) {
        return 100;
      }
      return 100 - this.time / this.blockLength * 100;
    },
    progressColor() {
      return {
        "is-primary": !this.isBlockStateTransition,
        "is-info": this.isBlockStateTransition
      };
    },
    ...mapGetters(["isBlockStateTransition"]),
    ...mapState(["time", "blockLength"])
  },
  methods: {
    ...mapActions(["toggleBlock"]),
    toggleToolbar() {
      this.$emit("toggle-toolbar");
    },
    hasMobileClass(c) {
      return { [c]: this.$mq === "mobile" };
    }
  }
};
</script>

<style>
.show-button {
  align-self: end;
  margin-bottom: 3.5rem;
}
.has-med-v-pad {
  padding: 1rem 0;
}
.has-large-t-pad {
  padding-top: 4rem;
}
.is-huge {
  font-size: 10rem;
  line-height: 1;
}
.is-less-huge {
  font-size: 8rem;
}
.is-number {
  font-family: "Arial", monospace;
}
</style>
