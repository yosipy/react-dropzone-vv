import { afterEach, describe, expect, test } from "vitest"
import { render, fireEvent, cleanup } from "@testing-library/react"
import { FC } from "react"
import { OnSelectProps, ReactDropzoneVV } from "./ReactDropzoneVV"
import { useReactDropzoneVV } from "./useReactDropzoneVV"
import { RejectedClassifiedFile } from "./types"

let acceptedFiles: File[]
let fileRejections: RejectedClassifiedFile[]

const file = new File(["dummy content"], "example.png", { type: "image/png" })

type Props = {
  accept?: string
  disabled?: boolean
  multiple?: boolean
}

const TestComponent: FC<Props> = (props) => {
  const reactDropzoneVV = useReactDropzoneVV()

  const handleSelect = (props: OnSelectProps) => {
    console.log("handleSelect")
    acceptedFiles = props.acceptedFiles
    fileRejections = props.fileRejections
  }

  return (
    <ReactDropzoneVV
      reactDropzoneVV={reactDropzoneVV}
      accept={props.accept}
      disabled={props.disabled}
      multiple={props.multiple}
      onSelect={handleSelect}
    >
      dropzone
    </ReactDropzoneVV>
  )
}

describe("ReactDropzoneVV", () => {
  afterEach(cleanup)

  describe("accept", () => {
    test("sets 'accept' props in <input>", async () => {
      const { container } = render(<TestComponent accept=".png" />)

      expect(container.querySelector("input")).toHaveProperty("accept", ".png")
    })

    describe("inputed file type includes accept", () => {
      test("acceptedFiles includes files", async () => {
        const { getByText } = render(<TestComponent />)
        const dropzone = getByText(/dropzone/i)

        fireEvent.drop(dropzone, {
          dataTransfer: { files: [file] },
        })

        expect(acceptedFiles).toStrictEqual([file])
      })
    })

    describe("inputed file type excludes accept", () => {
      test("acceptedFiles is empty array", async () => {
        const { getByText } = render(<TestComponent accept=".json" />)
        const dropzone = getByText(/dropzone/i)

        fireEvent.drop(dropzone, {
          dataTransfer: { files: [file] },
        })

        expect(acceptedFiles).toStrictEqual([])
        expect(fileRejections).toStrictEqual([
          {
            status: "rejected",
            file,
            rejectedCode: "accept-violations",
          },
        ])
      })
    })
  })

  describe("disabled", () => {
    test("sets 'disabled' props in <input>", async () => {
      const { container } = render(<TestComponent disabled={true} />)

      expect(container.querySelector("input")).toHaveProperty("disabled", true)
    })
  })

  describe("multiple", () => {
    test("sets 'multiple' props in <input>", async () => {
      const { container } = render(<TestComponent multiple={false} />)

      expect(container.querySelector("input")).toHaveProperty("multiple", false)
    })
  })
})
