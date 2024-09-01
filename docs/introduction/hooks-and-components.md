# Hooks and Components

## useReactDropzoneVV

### Return values

| name         | Type                               |
| ------------ | ---------------------------------- |
| isDragging   | boolean                            |
| inputRef     | React.RefObject<HTMLInputElement\> |
| openSelector | () => void                         |

## ReactDropzoneVV

### PROPS & METHODS

| Prop name       | Type                                        | Default | Description                                                                   |
| --------------- | ------------------------------------------- | ------- | ----------------------------------------------------------------------------- |
| children        | ReactNode                                   |         |                                                                               |
| reactDropzoneVV | UseReactDropzoneVV                          |         | The return value of useReactDropzoneVV.                                       |
| inputProps      | HTMLProps<HTMLInputElement\>                |         |                                                                               |
| accept          | string                                      | ""      |                                                                               |
| disabled        | boolean                                     | false   |                                                                               |
| multiple        | boolean                                     | true    |                                                                               |
| noClick         | boolean                                     | false   |                                                                               |
| noDrag          | boolean                                     | false   |                                                                               |
| onDragEnter     | (event: DragEvent<HTMLDivElement\>) => void |         |                                                                               |
| onDragOver      | (event: DragEvent<HTMLDivElement\>) => void |         |                                                                               |
| onDragLeave     | (event: DragEvent<HTMLDivElement\>) => void |         |                                                                               |
| onDrop          | (files: File[]) => void                     |         |                                                                               |
| onSelect        | (props: OnSelectProps) => void              |         | Callbacks when the Drop event occurs and when a file is selected in a dialog. |
| onError         | (error: Error) => void                      |         |                                                                               |

### Supplement onSelect

For most applications, two are sufficient: acceptedFiles and fileRejections.
Use acceptedFiles if you need a list of accepted files, and use fileRejections if you need a list of rejected files.
The fileRejections contains the reason for the rejection.

classifiedFiles is an array containing both acceptedFiles and fileRejections.
classifiedFiles is useful, for example, for adding your own custom validations.

Simplified ClassifiedFile type is defined as follows:

```ts
export type RejectedCode = "more-than-one-file" | "accept-violations"

export type AcceptedClassifiedFile = {
  status: "accepted"
  file: File
  rejectedCode: undefined
}

export type RejectedClassifiedFile = {
  status: "rejected"
  file: File
  rejectedCode: RejectedCode | string
}

export type ClassifiedFile = AcceptedClassifiedFile | RejectedClassifiedFile
```

ClassifiedFile is classified as "accepted" or "rejected" depending on its status.
How to split an array by status can be seen in the example.

Note that the update may increase the RejectedCode.
