export default {
  methods: {
    hasMobileClass(c) {
      return { [c]: this.$mq === "mobile" };
    },
    hasNonMobileClass(c) {
      return { [c]: this.$mq !== "mobile" };
    }
  }
};
