# Accepting specific file types

## demo

<div ref="el" />

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import { Accept } from './accepting-specific-file-types/Accept'

const el = ref()
onMounted(() => {
  const root = createRoot(el.value)
  root.render(createElement(Accept, {}, null))
})
</script>

## code

```tsx
import { FC, useState } from "react"
import {
  useReactDropzoneVV,
  ReactDropzoneVV,
  RejectedClassifiedFile,
} from "@lib/index"

export const Accept: FC = () => {
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([])
  const [fileRejections, setFileRejections] = useState<
    RejectedClassifiedFile[]
  >([])

  const reactDropzoneVV = useReactDropzoneVV({
    accept: "image/png,.webp",
    onSelect: async (classifiedFiles) => {
      const tAcceptedFiles = classifiedFiles
        .filter((classifiedFile) => classifiedFile.status == "accepted")
        .map((classifiedFile) => classifiedFile.file)
      const tFileRejections = classifiedFiles.filter(
        (classifiedFile) => classifiedFile.status == "rejected"
      )
      setAcceptedFiles(tAcceptedFiles)
      setFileRejections(tFileRejections)
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

      <div>acceptedFiles</div>
      <ul>
        {acceptedFiles.map((acceptedFile, index) => (
          <li key={index}>{acceptedFile.name}</li>
        ))}
      </ul>
      <div>fileRejections</div>
      <ul>
        {fileRejections.map((fileRejection, index) => (
          <span key={index}>
            <li>{fileRejection.file.name}</li>
            <ul>
              <li>{fileRejection.errorCode}</li>
            </ul>
          </span>
        ))}
      </ul>
    </section>
  )
}
```
