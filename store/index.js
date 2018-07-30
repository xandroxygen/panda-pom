const POMODORO_TIME = 25 * 60;
const LONG_BREAK_TIME = 10 * 60;
const SHORT_BREAK_TIME = 5 * 60;

const TICK = "TICK";
const RESET_TIME = "RESET_TIME";
const SET_INTERVAL = "SET_INTERVAL";
const SET_BLOCK_STATE = "SET_BLOCK_STATE";
const SET_BLOCK_TYPE = "SET_BLOCK_TYPE";
const CLEAR_INTERVAL = "CLEAR_INTERVAL";
const COMPLETE_POMODORO = "COMPLETE_POMODORO";
const ADVANCE_BLOCK_TYPE = "ADVANCE_BLOCK_TYPE";
const RESET_BLOCK = "RESET_BLOCK";
const SET_GOAL = "SET_GOAL";

import * as blockTypes from "../assets/blockTypes.js";
import * as blockState from "../assets/state.js";

export const state = () => ({
  completed: 0,
  goal: 10,
  time: POMODORO_TIME,
  blockLength: POMODORO_TIME,
  blockType: blockTypes.POMODORO,
  blockState: blockState.IDLE,
  interval: false,
  breakCounter: 0,
  autostart: false //this will eventually go in preferences
});

export const getters = {
  isPomActive(state) {
    return (
      state.blockType === blockTypes.POMODORO &&
      (state.blockState === blockState.ACTIVE ||
        state.blockState === blockState.STOPPED)
    );
  },
  isBlockStateActive(state) {
    return state.blockState === blockState.ACTIVE;
  },
  isBlockStateTransition(state) {
    return state.blockState === state.TRANSITION;
  },
  isBlockStateNotTransition(state) {
    return state.blockState !== blockState.TRANSITION;
  },
  isBlockTypePomodoro(state) {
    return state.blockType === blockTypes.POMODORO;
  },
  isBlockTypeLongBreak(state) {
    return state.blockType === blockTypes.LONG_BREAK;
  },
  isBlockTypeShortBreak(state) {
    return state.blockType === blockTypes.SHORT_BREAK;
  }
};

export const mutations = {
  [TICK](state) {
    state.time -= 1;
  },
  [RESET_TIME](state) {
    state.time = 0;
  },
  [SET_INTERVAL](state, interval) {
    state.interval = interval;
  },
  [CLEAR_INTERVAL](state) {
    clearInterval(state.interval);
  },
  [SET_BLOCK_STATE](state, blockState) {
    state.blockState = blockState;
  },
  [SET_BLOCK_TYPE](state, blockType) {
    state.blockType = blockType;
  },
  [SET_GOAL](state, goal) {
    state.goal = goal;
  },
  [ADVANCE_BLOCK_TYPE](state) {
    if (state.blockType === blockTypes.POMODORO) {
      if (state.breakCounter === 3) {
        state.breakCounter = 0;
        state.blockType = blockTypes.LONG_BREAK;
      } else {
        state.breakCounter += 1;
        state.blockType = blockTypes.SHORT_BREAK;
      }
    } else {
      state.blockType = blockTypes.POMODORO;
    }
  },
  [RESET_BLOCK](state) {
    state.blockState = blockState.IDLE;
    state.blockLength =
      state.blockType === blockTypes.POMODORO
        ? POMODORO_TIME
        : state.blockType === blockTypes.LONG_BREAK
          ? LONG_BREAK_TIME
          : SHORT_BREAK_TIME;
    state.time = state.blockLength;
  }
};

export const actions = {
  startBlock({ commit, state, dispatch, getters }) {
    if (getters.isBlockStateActive) {
      return;
    }

    const interval = setInterval(() => {
      if (getters.isBlockStateActive) {
        commit(TICK);
        if (state.time < 0) {
          commit(RESET_TIME);
          dispatch("stopBlock");
          dispatch("completeBlock");
        }
      }
    }, 1000);
    commit(SET_INTERVAL, interval);
    commit(SET_BLOCK_STATE, blockState.ACTIVE);
  },
  stopBlock({ commit, state }) {
    if (state.blockState === blockState.ACTIVE) {
      commit(SET_BLOCK_STATE, blockState.STOPPED);
      commit(CLEAR_INTERVAL);
    } else if (state.blockState === blockState.TRANSITION) {
      commit(SET_BLOCK_STATE, blockState.IDLE);
    }
  },
  completeBlock({ commit, state, dispatch }) {
    const newState = state.autostart ? blockState.TRANSITION : blockState.IDLE;
    commit(SET_BLOCK_STATE, newState);

    if (state.blockType === blockTypes.POMODORO) {
      commit(COMPLETE_POMODORO);
      const message =
        state.completed === state.goal
          ? "You achieved your goal! 🙌🏻 "
          : "Pomodoro completed! 🚀 ";
      console.log(message); // will be replaced with dispatch to notify
    } else {
      console.log("Your break is over, back to work!"); // will be replaced with dispatch to notify
    }

    if (state.autostart && state.blockState === blockState.TRANSITION) {
      commit(ADVANCE_BLOCK_TYPE);
      commit(RESET_BLOCK);
      dispatch("startBlock");
    } else if (state.blockState !== blockState.TRANSITION) {
      commit(RESET_BLOCK);
    }
  },
  toggleBlock({ state, dispatch }) {
    if (state.blockState === blockState.ACTIVE) {
      dispatch("stopBlock");
    } else {
      dispatch("startBlock");
    }
  },
  changeBlockType({ commit, dispatch }, { type }) {
    commit(SET_BLOCK_TYPE, type);
    dispatch("stopBlock");
    commit(RESET_BLOCK);
  },
  changeToPomodoro({ dispatch }) {
    dispatch("changeBlockType", { type: blockTypes.POMODORO });
  },
  changeToLongBreak({ dispatch }) {
    dispatch("changeBlockType", { type: blockTypes.LONG_BREAK });
  },
  changeToShortBreak({ dispatch }) {
    dispatch("changeBlockType", { type: blockTypes.SHORT_BREAK });
  }
};
