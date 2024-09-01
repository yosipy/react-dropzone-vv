import type { FC, HTMLProps, ReactNode } from "react"
import { useCallback } from "react"
import type { UseReactDropzoneVV } from "./useReactDropzoneVV"
import {
  classifyByAcceptability,
  ensureError,
  splitClassifiedFiles,
} from "./utils"
import { ClassifiedFile, RejectedClassifiedFile } from "./types"

export type OnSelectProps = {
  acceptedFiles: File[]
  fileRejections: RejectedClassifiedFile[]
  classifiedFiles: ClassifiedFile[]
}

export type ReactDropzoneVVProps = Omit<
  HTMLProps<HTMLDivElement>,
  "accept" | "disabled" | "multiple" | "onSelect" | "onError" | "onDrop"
> & {
  children: ReactNode
  reactDropzoneVV: UseReactDropzoneVV
  inputProps?: HTMLProps<HTMLInputElement>
  accept?: string
  disabled?: boolean
  multiple?: boolean
  noClick?: boolean
  noDrag?: boolean
  onDragEnter?: (event: React.DragEvent<HTMLDivElement>) => void
  onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void
  onDragLeave?: (event: React.DragEvent<HTMLDivElement>) => void
  onDrop?: (files: File[]) => void
  onSelect?: (props: OnSelectProps) => void
  onError?: (error: Error) => void
}

export const ReactDropzoneVV: FC<ReactDropzoneVVProps> = ({
  children,
  reactDropzoneVV: { setIsDragging, isDragging, inputRef, openSelector },
  inputProps,
  accept = "",
  disabled = false,
  multiple = true,
  noClick = false,
  noDrag = false,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
  onSelect,
  onError,
  ...props
}) => {
  const handleDragEnterDiv = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()

      if (noDrag) return

      setIsDragging(true)

      if (onDragEnter) onDragEnter(event)
    },
    [noDrag, setIsDragging, onDragEnter]
  )

  const handleDragOverDiv = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()

      if (noDrag) return

      if (!isDragging) {
        setIsDragging(true)
      }

      if (onDragOver) onDragOver(event)
    },
    [noDrag, isDragging, setIsDragging, onDragOver]
  )

  const handleDragLeaveDiv = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()

      if (noDrag) return

      if (!event.currentTarget.contains(event.relatedTarget as Node)) {
        setIsDragging(false)
      }

      if (onDragLeave) onDragLeave(event)
    },
    [noDrag, setIsDragging, onDragLeave]
  )

  const handleDropDiv = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      try {
        event.preventDefault()
        event.stopPropagation()

        if (noDrag) return

        setIsDragging(false)

        const files = Array.from(event.dataTransfer.files)

        if (onDrop) onDrop(files)

        const classifiedFiles = classifyByAcceptability(files, {
          accept: accept,
          multiple: multiple,
        })
        const { acceptedFiles, fileRejections } =
          splitClassifiedFiles(classifiedFiles)
        if (onSelect) {
          onSelect({
            acceptedFiles,
            fileRejections,
            classifiedFiles,
          })
        }
      } catch (error) {
        if (onError) {
          onError(ensureError(error))
        }
      }
    },
    [accept, multiple, noDrag, setIsDragging, onDrop, onSelect, onError]
  )

  const handleClickDiv = () => {
    if (noClick) return

    openSelector()
  }

  const handleChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (noClick) return

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
    [accept, multiple, noClick, onSelect, onError]
  )

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
        onChange={disabled ? undefined : handleChangeInput}
      />
      {children}
    </div>
  )
}
