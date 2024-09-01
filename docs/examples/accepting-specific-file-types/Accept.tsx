import { FC, useState } from "react"
import {
  useReactDropzoneVV,
  ReactDropzoneVV,
  RejectedClassifiedFile,
  OnSelectProps,
} from "@lib/index"

export const Accept: FC = () => {
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([])
  const [fileRejections, setFileRejections] = useState<
    RejectedClassifiedFile[]
  >([])

  const reactDropzoneVV = useReactDropzoneVV()

  const handleSelect = (props: OnSelectProps) => {
    setAcceptedFiles(props.acceptedFiles)
    setFileRejections(props.fileRejections)
  }

  return (
    <section style={{ border: "solid", padding: "1rem" }}>
      <ReactDropzoneVV
        reactDropzoneVV={reactDropzoneVV}
        accept="image/png,.webp"
        onSelect={handleSelect}
      >
        <div
          style={{
            padding: "2rem",
            border: "dashed",
            backgroundColor: reactDropzoneVV.isDragging ? "#737373" : "#404040",
          }}
        >
          <p>Drag & drop some files here, or click to select files</p>
          <p>
            {'(Allowed mime type is "image/png", or file extention is ".webp")'}
          </p>
        </div>
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
