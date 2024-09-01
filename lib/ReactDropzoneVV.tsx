import type { FC, HTMLProps, ReactNode } from "react"
import { useCallback, useEffect } from "react"
import type { UseReactDropzoneVV } from "./useReactDropzoneVV"
import {
  classifyByAcceptability,
  ensureError,
  splitClassifiedFiles,
} from "./utils"

export type ReactDropzoneVVProps = HTMLProps<HTMLDivElement> & {
  reactDropzoneVV: UseReactDropzoneVV
  inputProps?: HTMLProps<HTMLInputElement>
  children: ReactNode
}

export const ReactDropzoneVV: FC<ReactDropzoneVVProps> = ({
  reactDropzoneVV: {
    accept,
    disabled,
    disabledDropOnDocment,
    multiple,
    setIsDragging,
    isDragging,
    inputRef,
    onDrop,
    onSelect,
    onError,
    ...reactDropzoneVV
  },
  inputProps,
  children,
  ...props
}) => {
  const handleDragEnterDiv = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      setIsDragging(true)
    },
    [setIsDragging]
  )

  const handleDragLeaveDiv = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      if (!event.currentTarget.contains(event.relatedTarget as Node)) {
        setIsDragging(false)
      }
    },
    [setIsDragging]
  )

  const handleDragOverDiv = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      if (!isDragging) {
        setIsDragging(true)
      }
    },
    [isDragging, setIsDragging]
  )

  const handleDropDiv = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      try {
        event.preventDefault()
        event.stopPropagation()
        setIsDragging(false)

        const files = Array.from(event.dataTransfer.files)

        if (onDrop) {
          onDrop(files)
        }
        const classifiedFiles = classifyByAcceptability(files, {
          accept: accept,
          multiple: multiple,
        })
        const { acceptedFiles, fileRejections } =
          splitClassifiedFiles(classifiedFiles)
        if (onSelect)
          onSelect({
            acceptedFiles,
            fileRejections,
            classifiedFiles,
          })
      } catch (error) {
        if (onError) {
          onError(ensureError(error))
        }
      }
    },
    [accept, multiple, setIsDragging, onDrop, onSelect, onError]
  )

  const handleClickDiv = () => {
    reactDropzoneVV.open()
  }

  const handleChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const files = Array.from(event.target.files || [])
        if (files.length > 0) {
          const classifiedFiles = classifyByAcceptability(files, {
            accept: accept,
            multiple: multiple,
          })
          const { acceptedFiles, fileRejections } =
            splitClassifiedFiles(classifiedFiles)
          if (onSelect)
            onSelect({
              acceptedFiles,
              fileRejections,
              classifiedFiles,
            })
        }
        event.target.value = ""
      } catch (error) {
        if (onError) {
          onError(ensureError(error))
        }
      }
    },
    [accept, multiple, onSelect, onError]
  )

  useEffect(() => {
    const handleDocumentDrop = (event: DragEvent) => {
      event.preventDefault()
      event.stopPropagation()
    }

    if (disabledDropOnDocment) {
      document.addEventListener("dragover", handleDocumentDrop)
      document.addEventListener("drop", handleDocumentDrop)
    }

    return () => {
      if (disabledDropOnDocment) {
        document.removeEventListener("dragover", handleDocumentDrop)
        document.removeEventListener("drop", handleDocumentDrop)
      }
    }
  }, [disabledDropOnDocment])

  return (
    <div
      {...props}
      onDragEnter={disabled ? undefined : handleDragEnterDiv}
      onDragLeave={disabled ? undefined : handleDragLeaveDiv}
      onDragOver={disabled ? undefined : handleDragOverDiv}
      onDrop={disabled ? undefined : handleDropDiv}
      onClick={disabled ? undefined : handleClickDiv}
    >
      <input
        accept={accept}
        disabled={disabled}
        multiple={multiple}
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        {...inputProps}
        onChange={handleChangeInput}
      />
      {children}
    </div>
  )
}
