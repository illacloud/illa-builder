import { FC } from "react"
import { ScaleSquareProps } from "@/page/App/components/ScaleSquare/interface"
import { applyScaleSquareContainer } from "@/page/App/components/ScaleSquare/style"

export const ScaleSquare: FC<ScaleSquareProps> = (props) => {
  const { w, h, componentNode, ...otherProps } = props
  return <div css={applyScaleSquareContainer(h, w)} {...otherProps} />
}
