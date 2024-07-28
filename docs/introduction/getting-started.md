# Getting Started

## Installation

```bash
npm i react-dropzone-vv
```

## Usage

The files selected by react-dropzone-vv must be kept in the State by the user. The advantage of this is flexible integration with the user's application.

```tsx
import { FC, useState } from "react"
import {
  useReactDropzoneVV,
  ReactDropzoneVV,
  RejectedClassifiedFile,
} from "react-dropzone-vv"

export const Introduction: FC = () => {
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([])
  const [fileRejections, setFileRejections] = useState<
    RejectedClassifiedFile[]
  >([])

  const reactDropzoneVV = useReactDropzoneVV({
    accept: "image/*",
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
        <p>{'(Allowed mime type is "image/*"")'}</p>
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
