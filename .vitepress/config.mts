import { type DefaultTheme, defineConfig } from "vitepress";

const backendItem: DefaultTheme.SidebarItem = {
  collapsed: true,
  text: "バックエンド",
  items: [
    {
      text: "Ruby on Rails",
      items: [
        {
          text: "メモ",
          link: "/blogs/back-end/ruby-on-rails/memo.md",
        },
        {
          text: "モデルの関連付け",
          link: "/blogs/back-end/ruby-on-rails/model-association.md",
        },
        {
          text: "ActiveRecordの基礎",
          link: "/blogs/back-end/ruby-on-rails/ActiveRecordの基礎.md",
        },
      ],
    },
  ],
};

const frontEndItem: DefaultTheme.SidebarItem = {
  collapsed: true,
  text: "フロントエンド",
  items: [
    // TODO: 書いたら追加
    // {
    //   text: "React",
    //   items: [
    //     {
    //       text: "サンプル記事1",
    //       link: "/blogs/front-end/react/sample_1",
    //     },
    //   ],
    // },
    {
      text: "リッチテキストエディタの内容のコピー",
      link: "/blogs/front-end/リッチテキストエディタの内容のコピー",
    },
    {
      text: "LexicalでComposerを使用せずLexicalEditorを使用する",
      link: "/blogs/front-end/LexicalでComposerを使用せずLexicalEditorを使用する",
    },
    {
      text: "テスト関連",
      items: [
        {
          text: "testing-library",
          items: [
            {
              text: "クエリについて",
              link: "/blogs/front-end/testings/testing-library/about-query",
            },
          ],
        },
      ],
    },
  ],
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/MUKAIGAWARA_BLOG/",
  title: "MUKAIGAWARA Blog",
  description: "頑張って学んだことをちまちま書いていくブログ",
  lastUpdated: true,
  // cleanUrls: true,
  // metaChunk: true,
  markdown: {
    lineNumbers: true,
  },
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    search: {
      provider: "local",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Blogs", link: "/blogs" },
    ],
    sidebar: {
      "/blogs/": [
        {
          text: "Blogs",
          link: "/blogs/",
          items: [
            backendItem,
            frontEndItem,
            // TODO: 書いたら追加
            // {
            //   text: "Books",
            //   link: "/blogs/books/index",
            //   items: [
            //     {
            //       collapsed: true,
            //       text: "XP",
            //       link: "/blogs/books/xp/index.md",
            //     },
            //   ],
            // },
          ],
        },
      ],
      // "/examples/": [
      //   {
      //     text: "examples",
      //     items: [
      //       { text: "markdown", link: "/examples/md-examples/" },
      //       { text: "api", link: "/examples/api-examples" },
      //     ],
      //   },
      // ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/mukaigawara" }],
  },
});
