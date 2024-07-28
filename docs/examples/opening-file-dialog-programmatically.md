# Opening File Dialog Programmatically

## demo

<div ref="el" />

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import { OpenProgrammatically } from './opening-file-dialog-programmatically/OpenProgrammatically'

const el = ref()
onMounted(() => {
  const root = createRoot(el.value)
  root.render(createElement(OpenProgrammatically, {}, null))
})
</script>

## code

```tsx
import { FC, useState } from "react"
import { useReactDropzoneVV, ReactDropzoneVV } from "@lib/index"

export const OpenProgrammatically: FC = () => {
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([])

  const reactDropzoneVV = useReactDropzoneVV({
    onSelect: async (classifiedFiles) => {
      const tAcceptedFiles = classifiedFiles
        .filter((classifiedFile) => classifiedFile.status == "accepted")
        .map((classifiedFile) => classifiedFile.file)
      setAcceptedFiles(tAcceptedFiles)
    },
  })

  return (
    <section style={{ border: "solid", padding: "1rem" }}>
      <ReactDropzoneVV
        reactDropzoneVV={reactDropzoneVV}
        style={{
          padding: "2rem",
          border: "dashed",
          backgroundColor: reactDropzoneVV.isDragging ? "#737373" : "#404040",
        }}
      >
        <p>Drag & drop some files here, or click to select files</p>
      </ReactDropzoneVV>

      <button
        style={{ border: "solid", margin: "1rem" }}
        onClick={() => reactDropzoneVV.open()}
      >
        Open file dialog
      </button>

      <div>acceptedFiles</div>
      <ul>
        {acceptedFiles.map((acceptedFile, index) => (
          <li key={index}>{acceptedFile.name}</li>
        ))}
      </ul>
    </section>
  )
}
```