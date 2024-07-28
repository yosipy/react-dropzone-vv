import { useRef, useState } from "react"
import type { ClassifiedFile, RejectedClassifiedFile } from "./types"

export type UseReactDropzoneVVProps = {
  accept?: string
  disabled?: boolean
  disabledDropOnDocment?: boolean
  multiple?: boolean
  onDrop?: (files: File[]) => void
  onSelect?: (props: {
    acceptedFiles: File[]
    fileRejections: RejectedClassifiedFile[]
    classifiedFiles: ClassifiedFile[]
  }) => void
  onError?: (error: Error) => void
}

export type UseReactDropzoneVV = {
  accept: string
  setAccept: React.Dispatch<React.SetStateAction<string>>
  disabled: boolean
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>
  disabledDropOnDocment: boolean
  setDisabledDropOnDocment: React.Dispatch<React.SetStateAction<boolean>>
  multiple: boolean
  setMultiple: React.Dispatch<React.SetStateAction<boolean>>
  isDragging: boolean
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
  inputRef: React.RefObject<HTMLInputElement>
  open: () => void
  onDrop?: (files: File[]) => void
  onSelect?: (props: {
    acceptedFiles: File[]
    fileRejections: RejectedClassifiedFile[]
    classifiedFiles: ClassifiedFile[]
  }) => void
  onError?: (error: Error) => void
}

export const useReactDropzoneVV = ({
  accept: tAccept = "",
  disabled: tDisabled = false,
  disabledDropOnDocment: tDisabledDropOnDocment = false,
  multiple: tMultiple = true,
  onDrop,
  onSelect,
  onError,
}: UseReactDropzoneVVProps = {}): UseReactDropzoneVV => {
  const [accept, setAccept] = useState<string>(tAccept)
  const [disabled, setDisabled] = useState<boolean>(tDisabled)
  const [disabledDropOnDocment, setDisabledDropOnDocment] = useState<boolean>(
    tDisabledDropOnDocment
  )
  const [multiple, setMultiple] = useState<boolean>(tMultiple)

  const [isDragging, setIsDragging] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const open = () => {
    inputRef.current?.click()
  }

  return {
    accept,
    setAccept,
    disabled,
    setDisabled,
    disabledDropOnDocment,
    setDisabledDropOnDocment,
    multiple,
    setMultiple,
    isDragging,
    setIsDragging,
    inputRef,
    open,
    onDrop,
    onSelect,
    onError,
  }
}
