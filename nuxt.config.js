// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase =
  process.env.DEPLOY_ENV === "GITHUB"
    ? {
        router: {
          base: "/pandapom/"
        }
      }
    : {};

module.exports = {
  ...routerBase,
  build: {
    postcss: {
      plugins: {
        "postcss-custom-properties": {
          warnings: false
        }
      }
    }
  },
  head: {
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Productivity Timer" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    link: [
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon-32x32.png",
        sizes: "32x32"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon-16x16.png",
        sizes: "16x16"
      }
    ]
  },
  css: ["bulma/css/bulma.css"],
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
  ],
  plugins: ["~/plugins/font-awesome.js"]
};
