import { FC } from "react"
import { useReactDropzoneVV, ReactDropzoneVV, OnSelectProps } from "@lib/index"

const App: FC = () => {
  const reactDropzoneVV = useReactDropzoneVV({
    accept: ".png,.jpg,.jpeg,.webp",
  })

  const handleSelect = ({ classifiedFiles }: OnSelectProps) => {
    const acceptedFiles = classifiedFiles
      .filter((classifiedFile) => classifiedFile.status == "accepted")
      .map((classifiedFile) => classifiedFile.file)
    const fileRejections = classifiedFiles.filter(
      (classifiedFile) => classifiedFile.status == "rejected"
    )
    console.log("acceptedFiles:")
    console.log(acceptedFiles)
    console.log("fileRejections:")
    console.log(fileRejections)
  }

  const handleErrror = (e: Error) => {
    console.log("error!")
    console.log(e)
  }

  return (
    <>
      <ReactDropzoneVV
        reactDropzoneVV={reactDropzoneVV}
        style={{
          padding: "3rem",
          borderStyle: "dashed",
          backgroundColor: reactDropzoneVV.isDragging ? "grey" : "",
        }}
        onSelect={handleSelect}
        onError={handleErrror}
      >
        <>
          <em>(png, jpeg, webp)</em>
        </>
      </ReactDropzoneVV>
    </>
  )
}

export default App
