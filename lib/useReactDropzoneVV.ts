import { useRef, useState } from "react"

export type UseReactDropzoneVV = {
  isDragging: boolean
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
  inputRef: React.RefObject<HTMLInputElement | null>
  openSelector: () => void
}

export const useReactDropzoneVV = (): UseReactDropzoneVV => {
  const [isDragging, setIsDragging] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const openSelector = () => {
    inputRef.current?.click()
  }

  return {
    isDragging,
    setIsDragging,
    inputRef,
    openSelector,
  }
}
