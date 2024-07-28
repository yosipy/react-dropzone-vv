export type RejectedCode = "more-than-one-file" | "accept-violations"

export type AcceptedClassifiedFile = {
  status: "accepted"
  file: File
  errorCode: undefined
}

export type RejectedClassifiedFile<T extends string = string> = {
  status: "rejected"
  file: File
  errorCode: T
}

export type ClassifiedFile<T extends string = string> =
  | AcceptedClassifiedFile
  | RejectedClassifiedFile<T>
