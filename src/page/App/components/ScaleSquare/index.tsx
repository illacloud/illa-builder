import { FC } from "react"
import { ScaleSquareProps } from "@/page/App/components/ScaleSquare/interface"

export const ScaleSquare: FC<ScaleSquareProps> = (props) => {
  const { ...otherProps } = props
  return <div {...otherProps} />
}
