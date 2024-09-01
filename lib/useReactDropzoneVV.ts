import { useRef, useState } from "react"

export type UseReactDropzoneVVProps = {
  accept?: string
  disabled?: boolean
  multiple?: boolean
}

export type UseReactDropzoneVV = {
  accept: string
  setAccept: React.Dispatch<React.SetStateAction<string>>
  disabled: boolean
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>
  multiple: boolean
  setMultiple: React.Dispatch<React.SetStateAction<boolean>>
  isDragging: boolean
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
  inputRef: React.RefObject<HTMLInputElement>
  openSelector: () => void
}

export const useReactDropzoneVV = ({
  accept: tAccept = "",
  disabled: tDisabled = false,
  multiple: tMultiple = true,
}: UseReactDropzoneVVProps = {}): UseReactDropzoneVV => {
  const [accept, setAccept] = useState<string>(tAccept)
  const [disabled, setDisabled] = useState<boolean>(tDisabled)
  const [multiple, setMultiple] = useState<boolean>(tMultiple)

  const [isDragging, setIsDragging] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const openSelector = () => {
    inputRef.current?.click()
  }

  return {
    accept,
    setAccept,
    disabled,
    setDisabled,
    multiple,
    setMultiple,
    isDragging,
    setIsDragging,
    inputRef,
    openSelector,
  }
}
