import { FC } from "react"
import { useReactDropzoneVV, ReactDropzoneVV } from "@lib/index"

const App: FC = () => {
  const reactDropzoneVV = useReactDropzoneVV({
    accept: ".png,.jpg,.jpeg,.webp",
    disabledDropOnDocment: true,
    onSelect: async (classifiedFiles) => {
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
    },
    onError: (e) => {
      console.log("error!")
      console.log(e)
    },
  })

  return (
    <>
      <ReactDropzoneVV
        reactDropzoneVV={reactDropzoneVV}
        style={{
          padding: "3rem",
          borderStyle: "dashed 2px",
          backgroundColor: reactDropzoneVV.isDragging ? "grey" : "",
        }}
      >
        <>
          <em>(png, jpeg, webp)</em>
        </>
      </ReactDropzoneVV>
    </>
  )
}

export default App
