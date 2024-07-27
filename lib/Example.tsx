import { FC } from "react"

type Props = {
  a: string
}

export const Example: FC<Props> = (props) => {
  return <>{props.a}</>
}
