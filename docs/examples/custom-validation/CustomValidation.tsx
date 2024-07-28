import { FC, useState } from "react"
import {
  useReactDropzoneVV,
  ReactDropzoneVV,
  RejectedClassifiedFile,
  ClassifiedFile,
} from "@lib/index"

export const CustomValidation: FC = () => {
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([])
  const [fileRejections, setFileRejections] = useState<
    RejectedClassifiedFile[]
  >([])

  const reactDropzoneVV = useReactDropzoneVV({
    onSelect: async ({ classifiedFiles }) => {
      const maxLength = 20
      const customClassifiedFiles = classifiedFiles.map((classifiedFile) => {
        if (classifiedFile.status == "accepted") {
          const file = classifiedFile.file
          if (file.name.length > maxLength) {
            const fileRejection: ClassifiedFile = {
              status: "rejected",
              file,
              errorCode: "name-too-longer",
            }
            return fileRejection
          }
        }
        return classifiedFile
      })

      const tAcceptedFiles = customClassifiedFiles
        .filter((classifiedFile) => classifiedFile.status == "accepted")
        .map((classifiedFile) => classifiedFile.file)
      const tFileRejections = customClassifiedFiles.filter(
        (classifiedFile) => classifiedFile.status == "rejected"
      )

      setAcceptedFiles(tAcceptedFiles)
      setFileRejections(tFileRejections)
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
        <p>{"(Allowed if the file name' length is 20 or less)"}</p>
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
