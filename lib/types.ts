export type RejectedCode = "more-than-one-file" | "accept-violations"

export type AcceptedClassifiedFile = {
  status: "accepted"
  file: File
  rejectedCode: undefined
}

export type RejectedClassifiedFile<T extends string = string> = {
  status: "rejected"
  file: File
  rejectedCode: T
}

export type ClassifiedFile<T extends string = string> =
  | AcceptedClassifiedFile
  | RejectedClassifiedFile<T>
