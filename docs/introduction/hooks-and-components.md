# Hooks and Components

## useReactDropzoneVV

```tsx
export const Introduction: FC = () => {
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([])
  const [fileRejections, setFileRejections] = useState<
    RejectedClassifiedFile[]
  >([])

  const reactDropzoneVV = useReactDropzoneVV({
    accept: "image/*",
    onSelect: async (props) => {
      setAcceptedFiles(props.acceptedFiles)
      setFileRejections(props.fileRejections)
    },
    onError: (e) => {
      console.log(e)
    },
  })
```

### PROPS & METHODS

| Prop name             | Type                                                                                                                    | Default | Description                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accept                | string                                                                                                                  | ""      | [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) states the following: The accept attribute takes as its value a comma-separated list of one or more file types, or [unique file type specifiers](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept#unique_file_type_specifiers), describing which file types to allow. ex: `"audio/*,image/webp,.jpg,.pdf"` |
| disabled              | boolean                                                                                                                 | false   |                                                                                                                                                                                                                                                                                                                                                                                                          |
| disabledDropOnDocment | boolean                                                                                                                 | false   |                                                                                                                                                                                                                                                                                                                                                                                                          |
| multiple              | boolean                                                                                                                 | true    |                                                                                                                                                                                                                                                                                                                                                                                                          |
| onDrop                | (files: File[]) => void                                                                                                 |         | Callback when Drop event occurs.                                                                                                                                                                                                                                                                                                                                                                         |
| onSelect              | (props: { acceptedFiles: File[], fileRejections: RejectedClassifiedFile[], classifiedFiles: ClassifiedFile[] }) => void |         | Callbacks when the Drop event occurs and when a file is selected in a dialog.                                                                                                                                                                                                                                                                                                                            |
| onError               | (error: Error) => void                                                                                                  |         |                                                                                                                                                                                                                                                                                                                                                                                                          |

### Supplement onSelect

For most applications, two are sufficient: acceptedFiles and fileRejections.
Use acceptedFiles if you need a list of accepted files, and use fileRejections if you need a list of rejected files.
The fileRejections contains the reason for the rejection.

classifiedFiles is an array containing both acceptedFiles and fileRejections.
classifiedFiles is useful, for example, for adding your own custom validations.

ClassifiedFile type is defined as follows:

```ts
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
```

Please [click here](https://github.com/yosipy/react-dropzone-vv/blob/main/lib/types.ts) for the latest type definitions.
ClassifiedFile is classified as “accepted” or “rejected” depending on its status.
How to split an array by status can be seen in the example.

## ReactDropzoneVV

```tsx
<ReactDropzoneVV
  reactDropzoneVV={reactDropzoneVV}
  style={{
    padding: "2rem",
    border: "dashed",
    backgroundColor: reactDropzoneVV.isDragging ? "#737373" : "#404040",
  }}
>
  <p>Drag & drop some files here, or click to select files</p>
</ReactDropzoneVV>
```

### PROPS & METHODS

| Prop name       | Type                          | Default | Description                             |
| --------------- | ----------------------------- | ------- | --------------------------------------- |
| reactDropzoneVV | UseReactDropzoneVV            |         | The return value of useReactDropzoneVV. |
| inputProps      | HTMLProps\<HTMLInputElement\> |         |                                         |
| children        | ReactNode                     |         |                                         |
