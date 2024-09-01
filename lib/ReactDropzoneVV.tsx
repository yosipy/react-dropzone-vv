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
  const onDragEnterDiv = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      setIsDragging(true)
    },
    [setIsDragging]
  )

  const onDragLeaveDiv = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      if (!event.currentTarget.contains(event.relatedTarget as Node)) {
        setIsDragging(false)
      }
    },
    [setIsDragging]
  )

  const onDragOverDiv = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      if (!isDragging) {
        setIsDragging(true)
      }
    },
    [isDragging, setIsDragging]
  )

  const onDropDiv = useCallback(
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

  const onClickDiv = () => {
    reactDropzoneVV.open()
  }

  const onChangeInput = useCallback(
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
      onDragEnter={disabled ? undefined : onDragEnterDiv}
      onDragLeave={disabled ? undefined : onDragLeaveDiv}
      onDragOver={disabled ? undefined : onDragOverDiv}
      onDrop={disabled ? undefined : onDropDiv}
      onClick={disabled ? undefined : onClickDiv}
    >
      <input
        accept={accept}
        disabled={disabled}
        multiple={multiple}
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        {...inputProps}
        onChange={onChangeInput}
      />
      {children}
    </div>
  )
}
