import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPause,
  faRedo,
  faPlay,
  faCog,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPause, faRedo, faPlay, faCog, faChevronDown);
Vue.component("font-awesome-icon", FontAwesomeIcon);
