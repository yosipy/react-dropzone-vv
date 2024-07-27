import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "react-dropzone-vv",
  description: "react-dropzone-vv docs",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/examples/basic-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Basic Examples", link: "/examples/basic-examples" },
          {
            text: "Styling Dropzone Examples",
            link: "/examples/styling-dropzone-examples",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/yosipy/react-dropzone-vv" },
    ],
  },
})
