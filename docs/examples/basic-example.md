# Basic Example

## demo

<div ref="el" />

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import { Basic } from './basic-example/Basic'

const el = ref()
onMounted(() => {
  const root = createRoot(el.value)
  root.render(createElement(Basic, {}, null))
})
</script>

## code

```tsx
import { FC, useState } from "react"
import {
  useReactDropzoneVV,
  ReactDropzoneVV,
  RejectedClassifiedFile,
} from "react-dropzone-vv"

export const Basic: FC = () => {
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([])
  const [fileRejections, setFileRejections] = useState<
    RejectedClassifiedFile[]
  >([])

  const reactDropzoneVV = useReactDropzoneVV({
    onSelect: async (props) => {
      setAcceptedFiles(props.acceptedFiles)
      setFileRejections(props.fileRejections)
    },
    onError: (e) => {
      console.log(e)
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
              <li>{fileRejection.rejectedCode}</li>
            </ul>
          </span>
        ))}
      </ul>
    </section>
  )
}
```
