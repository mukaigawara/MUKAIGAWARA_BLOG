---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "MUKAIGAWARA Blog"
  # text: "A VitePress Site"
  tagline: 向川原 悠貴 のブログです。
  actions:
    - theme: brand
      text: 記事を見る
      link: /blogs
    # - theme: alt
    #   text: API Examples
    #   link: /api-examples
  image:
    src: /LOGO.jpg
    alt: logo
# features:
#   - title: Feature A
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
#   - title: Feature B
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
#   - title: Feature C
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

## Webエンジニアをしています。

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  /* --vp-home-hero-image-border-radius: 50%; TODO: 画像を円形にする方法を調べる */
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
