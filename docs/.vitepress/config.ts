import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "react-dropzone-vv",
  description:
    "react-dropzone-vv is a simple React hook " +
    "that creates a drag-and-drop zone for files. " +
    "Simple, yet customizable by the user.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Introduction", link: "/introduction/what-is-react-dropzone-vv" },
      { text: "Examples", link: "/examples/basic-example" },
    ],

    sidebar: [
      {
        text: "Introduction",
        items: [
          {
            text: "What is react-dropzone-vv",
            link: "/introduction/what-is-react-dropzone-vv",
          },
          { text: "Getting Started", link: "/introduction/getting-started" },
          {
            text: "Hooks and Components",
            link: "/introduction/hooks-and-components",
          },
        ],
      },
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
