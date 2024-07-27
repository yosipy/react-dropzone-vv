import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "react-dropzone-vv",
  description: "react-dropzone-vv docs",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/examples/basic-example" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Basic Example", link: "/examples/basic-example" },
          {
            text: "Accepting specific file types",
            link: "/examples/accepting-specific-file-types",
          },
          {
            text: "Opening File Dialog Programmatically",
            link: "/examples/opening-file-dialog-programmatically",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/yosipy/react-dropzone-vv" },
    ],
  },
  vite: {
    resolve: {
      alias: [{ find: "@lib", replacement: "/../lib" }],
    },
  },
})
