export type RejectedCode = "more-than-one-file" | "accept-violations"

export type AcceptedClassifiedFile = {
  status: "accepted"
  file: File
  errorCode: undefined
}

export type RejectedClassifiedFile<
  CustonRejectedCode extends string = RejectedCode
> = {
  status: "rejected"
  file: File
  errorCode: RejectedCode | CustonRejectedCode
}

export type ClassifiedFile<CustonRejectedCode extends string = RejectedCode> =
  | AcceptedClassifiedFile
  | RejectedClassifiedFile<CustonRejectedCode>
