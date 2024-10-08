import { afterEach, beforeEach, describe, expect, test } from "vitest"
import {
  render,
  fireEvent,
  cleanup,
  RenderResult,
} from "@testing-library/react"
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
  noClick?: boolean
  noDrag?: boolean
  onDragEnter?: (event: React.DragEvent<HTMLDivElement>) => void
  onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void
  onDragLeave?: (event: React.DragEvent<HTMLDivElement>) => void
  onDrop?: (files: File[]) => void
  onSelect?: (props: OnSelectProps) => void
}

const TestComponent: FC<Props> = (props) => {
  const reactDropzoneVV = useReactDropzoneVV()

  const handleSelect = (onSelectProps: OnSelectProps) => {
    acceptedFiles = onSelectProps.acceptedFiles
    fileRejections = onSelectProps.fileRejections

    if (props.onSelect) props.onSelect(onSelectProps)
  }

  return (
    <ReactDropzoneVV
      reactDropzoneVV={reactDropzoneVV}
      accept={props.accept}
      disabled={props.disabled}
      multiple={props.multiple}
      noClick={props.noClick}
      noDrag={props.noDrag}
      onDragEnter={props.onDragEnter}
      onDragOver={props.onDragOver}
      onDragLeave={props.onDragLeave}
      onDrop={props.onDrop}
      onSelect={handleSelect}
    >
      dropzone
    </ReactDropzoneVV>
  )
}

describe("ReactDropzoneVV", () => {
  afterEach(() => {
    cleanup()

    acceptedFiles = []
    fileRejections = []
  })

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

  describe("noClick", () => {
    const example = (noClick: boolean) => {
      const { container } = render(<TestComponent noClick={noClick} />)
      const inputElem = container.querySelector("input")

      if (!inputElem) throw new Error("inputElem is null")
      fireEvent.change(inputElem, {
        target: { files: [file] },
      })
    }

    describe("noClick is true", () => {
      test("acceptedFiles and fileRejections is empty array", async () => {
        example(true)

        expect(acceptedFiles.length).toBe(0)
        expect(fileRejections.length).toBe(0)
      })
    })

    describe("noClick is false", () => {
      test("acceptedFiles or fileRejections is non-empty array", async () => {
        example(false)

        expect(acceptedFiles.length).toBe(1)
        expect(fileRejections.length).toBe(0)
      })
    })
  })

  describe("noDrag", () => {
    const example = (noDrag: boolean) => {
      const { getByText } = render(<TestComponent noDrag={noDrag} />)
      const dropzone = getByText(/dropzone/i)

      fireEvent.drop(dropzone, {
        dataTransfer: { files: [file] },
      })
    }

    describe("noDrag is true", () => {
      test("acceptedFiles and fileRejections is empty array", async () => {
        example(true)

        expect(acceptedFiles.length).toBe(0)
        expect(fileRejections.length).toBe(0)
      })
    })

    describe("noDrag is false", () => {
      test("acceptedFiles or fileRejections is non-empty array", async () => {
        example(false)

        expect(acceptedFiles.length).toBe(1)
        expect(fileRejections.length).toBe(0)
      })
    })
  })

  describe("callback functions", () => {
    let actions: string[] = []
    beforeEach(() => {
      actions = []
    })

    const example = (): RenderResult => {
      return render(
        <TestComponent
          onDragEnter={() => actions.push("onDragEnter")}
          onDragOver={() => actions.push("onDragOver")}
          onDragLeave={() => actions.push("onDragLeave")}
          onDrop={() => actions.push("onDrop")}
          onSelect={() => actions.push("onSelect")}
        />
      )
    }

    describe("If click and select file", () => {
      test("should run callbacks", async () => {
        const { container } = example()
        const inputElem = container.querySelector("input")

        if (!inputElem) throw new Error("inputElem is null")
        fireEvent.change(inputElem, {
          target: { files: [file] },
        })

        expect(actions).toStrictEqual(["onSelect"])
      })
    })

    describe("If drag file", () => {
      describe("If only drag", () => {
        test("should run callbacks", async () => {
          const { getByText } = example()
          const dropzone = getByText(/dropzone/i)

          const options = {
            dataTransfer: { files: [file] },
          }
          fireEvent.dragEnter(dropzone, options)
          fireEvent.dragOver(dropzone, options)
          fireEvent.dragLeave(dropzone, options)

          expect(actions).toStrictEqual([
            "onDragEnter",
            "onDragOver",
            "onDragLeave",
          ])
        })
      })

      describe("If drag and drop", () => {
        test("should run callbacks", async () => {
          const { getByText } = example()
          const dropzone = getByText(/dropzone/i)

          const options = {
            dataTransfer: { files: [file] },
          }
          fireEvent.drop(dropzone, options)

          expect(actions).toStrictEqual(["onDrop", "onSelect"])
        })
      })
    })
  })
})
