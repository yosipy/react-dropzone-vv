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
  reactDropzoneVV,
  inputProps,
  children,
  ...props
}) => {
  const onDragEnterDiv = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      reactDropzoneVV.setIsDragging(true)
    },
    [reactDropzoneVV.setIsDragging]
  )

  const onDragLeaveDiv = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      if (!event.currentTarget.contains(event.relatedTarget as Node)) {
        reactDropzoneVV.setIsDragging(false)
      }
    },
    [reactDropzoneVV.setIsDragging]
  )

  const onDragOverDiv = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      if (!reactDropzoneVV.isDragging) reactDropzoneVV.setIsDragging(true)
    },
    [reactDropzoneVV.isDragging, reactDropzoneVV.setIsDragging]
  )

  const dependenciesForDivideByAcceptability = [
    reactDropzoneVV.accept,
    reactDropzoneVV.multiple,
  ]

  const onDropDiv = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      try {
        event.preventDefault()
        event.stopPropagation()
        reactDropzoneVV.setIsDragging(false)

        const files = Array.from(event.dataTransfer.files)

        if (reactDropzoneVV.onDrop) reactDropzoneVV.onDrop(files)
        const classifiedFiles = classifyByAcceptability(files, {
          accept: reactDropzoneVV.accept,
          multiple: reactDropzoneVV.multiple,
        })
        const { acceptedFiles, fileRejections } =
          splitClassifiedFiles(classifiedFiles)
        if (reactDropzoneVV.onSelect)
          reactDropzoneVV.onSelect({
            acceptedFiles,
            fileRejections,
            classifiedFiles,
          })
      } catch (error) {
        if (reactDropzoneVV.onError) reactDropzoneVV.onError(ensureError(error))
      }
    },
    [
      ...dependenciesForDivideByAcceptability,
      reactDropzoneVV.setIsDragging,
      reactDropzoneVV.onDrop,
      reactDropzoneVV.onSelect,
    ]
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
            accept: reactDropzoneVV.accept,
            multiple: reactDropzoneVV.multiple,
          })
          const { acceptedFiles, fileRejections } =
            splitClassifiedFiles(classifiedFiles)
          if (reactDropzoneVV.onSelect)
            reactDropzoneVV.onSelect({
              acceptedFiles,
              fileRejections,
              classifiedFiles,
            })
        }
        event.target.value = ""
      } catch (error) {
        if (reactDropzoneVV.onError) reactDropzoneVV.onError(ensureError(error))
      }
    },
    [...dependenciesForDivideByAcceptability, reactDropzoneVV.onSelect]
  )

  useEffect(() => {
    const handleDocumentDrop = (event: DragEvent) => {
      event.preventDefault()
      event.stopPropagation()
    }

    if (reactDropzoneVV.disabledDropOnDocment) {
      document.addEventListener("dragover", handleDocumentDrop)
      document.addEventListener("drop", handleDocumentDrop)
    }

    return () => {
      if (reactDropzoneVV.disabledDropOnDocment) {
        document.removeEventListener("dragover", handleDocumentDrop)
        document.removeEventListener("drop", handleDocumentDrop)
      }
    }
  }, [reactDropzoneVV.disabledDropOnDocment])

  return (
    <div
      {...props}
      onDragEnter={reactDropzoneVV.disabled ? undefined : onDragEnterDiv}
      onDragLeave={reactDropzoneVV.disabled ? undefined : onDragLeaveDiv}
      onDragOver={reactDropzoneVV.disabled ? undefined : onDragOverDiv}
      onDrop={reactDropzoneVV.disabled ? undefined : onDropDiv}
      onClick={reactDropzoneVV.disabled ? undefined : onClickDiv}
    >
      <input
        accept={reactDropzoneVV.accept}
        disabled={reactDropzoneVV.disabled}
        multiple={reactDropzoneVV.multiple}
        ref={reactDropzoneVV.inputRef}
        style={{ display: "none" }}
        type="file"
        {...inputProps}
        onChange={onChangeInput}
      />
      {children}
    </div>
  )
}
