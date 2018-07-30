import { getLocalStorage, setLocalStorage } from "../assets/localStorageAPI";

const SHOULD_NOTIFY = "shouldNotify";
const AUTOSTART = "autostart";
const SHOULD_SHOW_TIMER = "shouldShowTimerInTitle";
const SHOULD_SHOW_TOOLBAR = "shouldShowToolbar";

const requestNotificationPermission = async shouldNotify => {
  try {
    if (Notification) {
      if (shouldNotify && Notification.permission !== "granted") {
        const result = await Notification.requestPermission();
        return result === "granted";
      } else {
        return shouldNotify;
      }
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const state = () => ({
  shouldNotify: true,
  autostart: true,
  shouldShowTimerInTitle: true,
  shouldShowToolbar: true
});

export const mutations = {
  setValue(state, { type, value }) {
    state[type] = value;
  }
};

export const actions = {
  setPreference({ commit }, { type, value }) {
    setLocalStorage(type, value);
    commit("setValue", { type, value });
  },
  initializePreference({ state, commit, dispatch }, { type }) {
    const storedValue = getLocalStorage(type);
    if (storedValue !== undefined && storedValue != null) {
      dispatch("setPreference", { type, value: storedValue });
    }
  },
  async initialize({ state, commit, dispatch }) {
    dispatch("initializePreference", { type: AUTOSTART });
    dispatch("initializePreference", { type: SHOULD_SHOW_TIMER });
    dispatch("initializePreference", { type: SHOULD_SHOW_TOOLBAR });
    dispatch("initializePreference", { type: SHOULD_NOTIFY });

    dispatch("setShouldNotify", { value: state.shouldNotify });
  },
  setAutostart({ dispatch }, { value }) {
    dispatch("setPreference", { type: AUTOSTART, value });
  },
  async setShouldNotify({ dispatch }, { value }) {
    const permission = await requestNotificationPermission(value);
    dispatch("setPreference", { type: SHOULD_NOTIFY, value: permission });
  },
  setShouldShowTimer({ dispatch }, { value }) {
    dispatch("setPreference", { type: SHOULD_SHOW_TIMER, value });
  },
  setShouldShowToolbar({ dispatch }, { value }) {
    dispatch("setPreference", { type: SHOULD_SHOW_TOOLBAR, value });
  }
};
