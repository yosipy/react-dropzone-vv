import type { ClassifiedFile } from "./types"

export const ensureError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error
  }
  if (typeof error === "string") {
    return new Error(error)
  }
  if (typeof error === "object" && error !== null) {
    return new Error(JSON.stringify(error))
  }
  return new Error("Unknown error")
}

export const splitAccept = (accept: string) => {
  const memeTypesAndExtensions = accept.split(",")
  const mimeTypes = []
  const extensions = []

  for (const memeTypesAndExtension of memeTypesAndExtensions) {
    if (memeTypesAndExtension.includes("/")) {
      mimeTypes.push(memeTypesAndExtension)
    } else if (memeTypesAndExtension.startsWith(".")) {
      extensions.push(memeTypesAndExtension)
    } else {
      throw `'accept' is invalid: ${accept}`
    }
  }

  return { mimeTypes, extensions }
}

export const isExtensionMatch = (file: File, extensions: string[]) => {
  const fileName = file.name.toLowerCase()

  return extensions.some((extension) =>
    fileName.endsWith(extension.toLowerCase())
  )
}

export const isMimeTypeMatch = (file: File, mimeTypes: string[]) => {
  const fileType = file.type

  return mimeTypes.some((mimeType) => {
    if (mimeType.includes("/*")) {
      const baseType = mimeType.split("/")[0]

      return fileType.startsWith(baseType + "/")
    }

    return fileType === mimeType
  })
}

export const isAcceptedFile = (file: File, accept: string) => {
  if (accept == "") return true

  const { mimeTypes, extensions } = splitAccept(accept)

  return isExtensionMatch(file, extensions) || isMimeTypeMatch(file, mimeTypes)
}

export const classifyByAcceptability = (
  files: File[],
  options: {
    accept: string
    multiple: boolean
  }
) => {
  let classifiedFiles: ClassifiedFile[] = []

  if (options.multiple == false && files.length > 1) {
    classifiedFiles = Array.from(files, (file) => {
      return {
        status: "rejected",
        file: file,
        errorCode: "more-than-one-file",
      }
    })

    return classifiedFiles
  } else {
    for (const file of files) {
      if (isAcceptedFile(file, options.accept)) {
        classifiedFiles.push({
          status: "accepted",
          file: file,
          errorCode: undefined,
        })
      } else {
        classifiedFiles.push({
          status: "rejected",
          file: file,
          errorCode: "accept-violations",
        })
      }
    }

    return classifiedFiles
  }
}