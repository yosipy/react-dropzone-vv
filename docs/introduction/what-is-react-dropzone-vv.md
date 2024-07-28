# What is react-dropzone-vv

Simple React hook to create a drag-and-drop zone for files.
It is simple yet user-customizable.

A similar Package, [react-dropzone](https://github.com/react-dropzone/react-dropzone), is well known.
However, as of 2024, it has been out of date for about two years.
So I did not use react-dropzone for our own products, and used components I created myself. The created component is published as react-dropzone-vv.

react-dropzone-vv is heavily influenced by react-dropzone, but instead of Forking the repository, we rewrote it from scratch.
The purpose of react-dropzone-vv is to provide a simple and easy-to-use HTML5-compliant drag-and-drop zone for files.

# demo

<div ref="el" />

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import { Introduction } from './Introduction'

const el = ref()
onMounted(() => {
  const root = createRoot(el.value)
  root.render(createElement(Introduction, {}, null))
})
</script>
