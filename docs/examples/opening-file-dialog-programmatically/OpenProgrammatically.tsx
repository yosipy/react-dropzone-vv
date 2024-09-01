import { FC, useState } from "react"
import { useReactDropzoneVV, ReactDropzoneVV, OnSelectProps } from "@lib/index"

export const OpenProgrammatically: FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const reactDropzoneVV = useReactDropzoneVV({})

  const handleSelect = ({ acceptedFiles }: OnSelectProps) => {
    setSelectedFiles(acceptedFiles)
  }

  return (
    <section style={{ border: "solid", padding: "1rem" }}>
      <ReactDropzoneVV
        reactDropzoneVV={reactDropzoneVV}
        style={{
          padding: "2rem",
          border: "dashed",
          backgroundColor: reactDropzoneVV.isDragging ? "#737373" : "#404040",
        }}
        onSelect={handleSelect}
      >
        <p>Drag & drop some files here, or click to select files</p>
      </ReactDropzoneVV>

      <button
        style={{ border: "solid", margin: "1rem" }}
        onClick={() => reactDropzoneVV.openSelector()}
      >
        Open file dialog
      </button>

      <div>acceptedFiles</div>
      <ul>
        {selectedFiles.map((selectedFile, index) => (
          <li key={index}>{selectedFile.name}</li>
        ))}
      </ul>
    </section>
  )
}
