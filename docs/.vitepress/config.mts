import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/MUKAIGAWARA_BLOG/",
  title: "MUKAIGAWARA Blog",
  description: "For VitePress Site",
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  themeConfig: {
    search: {
      provider: "local",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/examples" },
      { text: "Tests", link: "/test" },
    ],
    sidebar: {
      test: [
        {
          text: "Guide",
          items: [
            { text: "markdown", link: "/md-example/" },
            { text: "api", link: "/api-example" },
          ],
        },
      ],

      // This sidebar gets displayed when a user
      // is on `guide` directory.
      // "/test/": [
      //   {
      //     text: "/test/",
      //     items: [
      //       {
      //         text: "Index",
      //         link: "/guide/",
      //         items: [
      //           {
      //             text: "Index",
      //             link: "/guide/",
      //             items: [
      //               { text: "Index", link: "/guide/" },
      //               { text: "One", link: "/guide/one" },
      //               { text: "Two", link: "/guide/two" },
      //             ],
      //             collapsed: true,
      //           },
      //           { text: "One", link: "/guide/one" },
      //           { text: "Two", link: "/guide/two" },
      //         ],
      //       },
      //       { text: "One", link: "/guide/one" },
      //       { text: "Two", link: "/guide/two" },
      //     ],
      //   },
      // ],

      // This sidebar gets displayed when a user
      // is on `config` directory.
      "/examples/": [
        {
          text: "examples",
          items: [
            { text: "markdown", link: "/examples/md-examples/" },
            { text: "api", link: "/examples/api-examples" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
