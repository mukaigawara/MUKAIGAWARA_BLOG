import Theme from "vitepress/theme";
import Playground from "../components/Playground.vue";
import "./custom.css";

export default {
  ...Theme,

  enhanceApp({ app }) {
    app.component("playground", Playground);
  },
};
