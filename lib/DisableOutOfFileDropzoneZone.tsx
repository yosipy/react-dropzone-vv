import { FC, useEffect } from "react"

export const DisableOutOfFileDropzoneZone: FC<{ disabled?: boolean }> = ({
  disabled = true,
}) => {
  useEffect(() => {
    const handleDocumentDrop = (event: DragEvent) => {
      event.preventDefault()
      event.stopPropagation()
    }

    if (disabled) {
      document.addEventListener("dragover", handleDocumentDrop)
      document.addEventListener("drop", handleDocumentDrop)
    }

    return () => {
      if (disabled) {
        document.removeEventListener("dragover", handleDocumentDrop)
        document.removeEventListener("drop", handleDocumentDrop)
      }
    }
  }, [disabled])

  return <></>
}
