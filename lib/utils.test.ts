import { beforeEach, describe, expect, test } from "vitest"

import {
  ensureError,
  splitAccept,
  isExtensionMatch,
  isMimeTypeMatch,
  isAcceptedFile,
  classifyByAcceptability,
  splitClassifiedFiles,
} from "./utils"
import { ClassifiedFile } from "./types"

describe("ensureError", () => {
  describe("If error type is Error", () => {
    test("Should return Error object", () => {
      const resultError = ensureError(new Error("World is end."))
      expect(resultError.message).toBe("World is end.")
    })
  })

  describe("If error type is string", () => {
    test("Should return Error object with inputed text", () => {
      const resultError = ensureError("World is end.")
      expect(resultError.message).toBe("World is end.")
    })
  })

  describe("If error type is object (and is not null)", () => {
    test("Should return Error object with stringify object", () => {
      const resultError = ensureError({ message: "World is end." })
      expect(resultError.message).toBe('{"message":"World is end."}')
    })
  })

  describe("If error type is other", () => {
    test("Should return Error object with 'Unknown error'", () => {
      const resultError = ensureError(0)
      expect(resultError.message).toBe("Unknown error")
    })
  })
})

describe("splitAccept", () => {
  test("Should return separated mimeTypes and extensions", () => {
    expect(splitAccept("image/jpeg,video/*,.webp")).toStrictEqual({
      mimeTypes: ["image/jpeg", "video/*"],
      extensions: [".webp"],
    })
  })

  describe("If '/' is not included", () => {
    test("Should raise an exception", () => {
      expect(() => splitAccept("imagejpeg")).toThrowError("'accept' is invalid")
    })
  })

  describe("If the first character is not a '.'", () => {
    test("Should raise an exception", () => {
      expect(() => splitAccept("png")).toThrowError("'accept' is invalid")
    })
  })
})

describe("isExtensionMatch", () => {
  const file = new File(["hoge"], "hoge.txt", {
    type: "text/plain",
  })

  describe("If the extensions contains the same extension as the file", () => {
    test("Should return true", () => {
      expect(isExtensionMatch(file, [".txt"])).toBe(true)
    })
  })

  describe("If the extensions does not contain the same extension as the file", () => {
    test("Should return false", () => {
      expect(isExtensionMatch(file, [".ymmp"])).toBe(false)
    })
  })
})

describe("isMimeTypeMatch", () => {
  const file = new File(["hoge"], "hoge.txt", {
    type: "text/plain",
  })

  describe("If mimeTypes does not contain wildcards", () => {
    describe("If the mimeTypes is the same mimeTypes as the file", () => {
      test("Should return true", () => {
        expect(isMimeTypeMatch(file, ["text/plain"])).toBe(true)
      })
    })

    describe("If the mimeTypes is not the same mimeTypes as the file", () => {
      test("Should return false", () => {
        expect(isMimeTypeMatch(file, ["text/javascript"])).toBe(false)
      })
    })
  })

  describe("If mimeTypes contain wildcards", () => {
    describe("If the mimeTypes is the same mimeTypes as the file", () => {
      test("Should return true", () => {
        expect(isMimeTypeMatch(file, ["text/*"])).toBe(true)
      })
    })

    describe("If the mimeTypes is not the same mimeTypes as the file", () => {
      test("Should return false", () => {
        expect(isMimeTypeMatch(file, ["image/*"])).toBe(false)
      })
    })
  })
})

describe("isAcceptedFile", () => {
  const textFile = new File(["text"], "text.txt", {
    type: "text/plain",
  })

  describe("If accept is empty text", () => {
    test("Should return true", () => {
      expect(isAcceptedFile(textFile, "")).toBe(true)
    })
  })

  describe("If accept is not empty text", () => {
    describe("If accept is same mime type of file", () => {
      test("Should return true", () => {
        expect(isAcceptedFile(textFile, "text/plain")).toBe(true)
      })
    })

    describe("If accept is different mime type of file", () => {
      test("Should return false", () => {
        expect(isAcceptedFile(textFile, "text/javascript")).toBe(false)
      })
    })
  })
})

describe("classifyByAcceptability", () => {
  const textFile = new File(["text"], "text.txt", {
    type: "text/plain",
  })
  const jsFile = new File(["javascript"], "javascript.js", {
    type: "text/javascript",
  })

  describe("If options.multiple is false", () => {
    const multiple = false

    describe("If input one file", () => {
      test("Status should be accepted and errorCode should be undefined", () => {
        const classifiedFiles = classifyByAcceptability([textFile], {
          accept: "text/plain",
          multiple,
        })
        expect(classifiedFiles).toStrictEqual([
          {
            status: "accepted",
            file: textFile,
            errorCode: undefined,
          },
        ])
      })
    })

    describe("If input multi files", () => {
      test("Status should be rejected and errorCode should be more-than-one-file", () => {
        const classifiedFiles = classifyByAcceptability([textFile, jsFile], {
          accept: "image/png",
          multiple,
        })
        expect(classifiedFiles).toStrictEqual([
          {
            status: "rejected",
            file: textFile,
            errorCode: "more-than-one-file",
          },
          {
            status: "rejected",
            file: jsFile,
            errorCode: "more-than-one-file",
          },
        ])
      })
    })
  })

  describe("If options.multiple is true", () => {
    const multiple = true

    describe("If input files mimeType is included options.accept", () => {
      test("Status should be accepted and errorCode should be undefined", () => {
        const classifiedFiles = classifyByAcceptability([textFile, jsFile], {
          accept: "text/*",
          multiple,
        })
        expect(classifiedFiles).toStrictEqual([
          {
            status: "accepted",
            file: textFile,
            errorCode: undefined,
          },
          {
            status: "accepted",
            file: jsFile,
            errorCode: undefined,
          },
        ])
      })
    })

    describe("If input file mimeType is not included options.accept", () => {
      test("Status should be rejected and errorCode should be accept-violations", () => {
        const classifiedFiles = classifyByAcceptability([textFile, jsFile], {
          accept: "image/png",
          multiple,
        })
        expect(classifiedFiles).toStrictEqual([
          {
            status: "rejected",
            file: textFile,
            errorCode: "accept-violations",
          },
          {
            status: "rejected",
            file: jsFile,
            errorCode: "accept-violations",
          },
        ])
      })
    })
  })
})

describe("splitClassifiedFiles", () => {
  let classifiedFiles: ClassifiedFile[] = []
  beforeEach(() => {
    classifiedFiles = [
      {
        status: "accepted",
        file: new File(["hoge"], "accepted1.txt", { type: "text/plain" }),
        errorCode: undefined,
      },
      {
        status: "accepted",
        file: new File(["hoge"], "accepted2.txt", { type: "text/plain" }),
        errorCode: undefined,
      },
      {
        status: "rejected",
        file: new File(["hoge"], "rejected.txt", { type: "text/plain" }),
        errorCode: "accept-violations",
      },
    ]
  })

  test("Should return acceptedFiles and fileRejections", () => {
    const { acceptedFiles, fileRejections } =
      splitClassifiedFiles(classifiedFiles)

    expect(acceptedFiles).toStrictEqual([
      new File(["hoge"], "accepted1.txt", { type: "text/plain" }),
      new File(["hoge"], "accepted2.txt", { type: "text/plain" }),
    ])
    expect(fileRejections).toStrictEqual([
      {
        status: "rejected",
        file: new File(["hoge"], "rejected.txt", { type: "text/plain" }),
        errorCode: "accept-violations",
      },
    ])
  })

  test("Should not changed classifiedFiles", () => {
    splitClassifiedFiles(classifiedFiles)

    expect(classifiedFiles.length).toBe(3)
  })
})
