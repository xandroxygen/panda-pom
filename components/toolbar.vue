<template>
  <div class="level">
      <div class="level-left">
        <div class="level-item has-text-centered">
          <div class="has-small-h-pad">
            <p class="heading">Goal Today</p>
            <div class="field">
              <div class="control">
                <input class="input title has-text-centered" type="number" min="1" max="16" pattern="\d*" :value="goal" @change="changeGoal">
              </div>
            </div>
          </div>
          <div class="buttons">
            <button @click="toggleBlock" class="button is-large is-primary"><font-awesome-icon :icon="startStopIcon" size="lg" /></button>
            <button @click="resetBlock" class="button is-large is-info"><font-awesome-icon icon="redo" size="lg" /></button>
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="buttons has-addons">
            <button 
              @click="changeToPomodoro" 
              class="button" 
              :class="isBlockActive(isBlockTypePomodoro)"
            >Pomodoro</button>
            <button 
              @click="changeToShortBreak" 
              class="button" 
              :class="isBlockActive(isBlockTypeShortBreak)"
            >Short Break</button>
            <button 
              @click="changeToLongBreak" 
              class="button"
              :class="isBlockActive(isBlockTypeLongBreak)"
            >Long Break</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  computed: {
    startStopIcon() {
      return this.isBlockStateActive ? "pause" : "play";
    },
    ...mapState(["goal"]),
    ...mapGetters([
      "isBlockStateActive",
      "isBlockTypePomodoro",
      "isBlockTypeLongBreak",
      "isBlockTypeShortBreak"
    ])
  },
  methods: {
    isBlockActive(condition) {
      return { "is-primary is-selected is-outlined": condition };
    },
    changeGoal({ target: { value } }) {
      const v = parseInt(value || "0");
      this.setGoal({ goal: v > 0 ? v : 1 });
    },
    ...mapActions([
      "setGoal",
      "resetBlock",
      "toggleBlock",
      "changeToPomodoro",
      "changeToLongBreak",
      "changeToShortBreak"
    ])
  }
};
</script>

<style>
.has-small-h-pad {
  padding: 0 0.5rem;
}
.input.title {
  width: 5.5rem;
  height: inherit;
  padding-top: 0px;
  padding-bottom: 0px;
  line-height: 1;
}
</style>
