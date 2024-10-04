import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/MUKAIGAWARA_BLOG/docs/",
  title: "MUKAIGAWARA Blog",
  description: "For VitePress Site",
  lastUpdated: true,
  // cleanUrls: true,
  // metaChunk: true,
  themeConfig: {
    search: {
      provider: "local",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      // { text: "Examples", link: "/examples" },
      { text: "Blogs", link: "/blogs" },
    ],
    sidebar: {
      "/blogs/": [
        {
          text: "Blogs",
          items: [
            {
              text: "フロントエンド",
              link: "/blogs/front-end",
              items: [
                {
                  collapsed: true,
                  text: "React",
                  link: "/blogs/front-end/react/sample_1",
                  items: [
                    { text: "記事1", link: "/blogs/front-end/react/sample_1" },
                    { text: "記事2", link: "/blogs/front-end/react/sample_2" },
                    { text: "記事3", link: "/blogs/front-end/react/sample_3" },
                  ],
                },
              ],
            },
            {
              text: "Books",
              link: "/blogs/books/index",
              items: [
                {
                  collapsed: true,
                  text: "XP",
                  link: "/blogs/books/xp/index.md",
                },
              ],
            },
          ],
        },
      ],
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

    socialLinks: [{ icon: "github", link: "https://github.com/mukaigawara" }],
  },
});
