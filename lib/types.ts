export type RejectedCode = "more-than-one-file" | "accept-violations"

export type ClassifiedFile<CustonRejectedCode extends string = RejectedCode> =
  | {
      status: "accepted"
      file: File
      errorCode: undefined
    }
  | {
      status: "rejected"
      file: File
      errorCode: RejectedCode | CustonRejectedCode
    }
