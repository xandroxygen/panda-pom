module.exports = {
  build: {
    postcss: {
      plugins: {
        "postcss-custom-properties": {
          warnings: false
        }
      }
    }
  },
  modules: [
    [
      "nuxt-mq",
      {
        breakpoints: {
          mobile: 769,
          other: Infinity
        }
      }
    ]
  ]
};
