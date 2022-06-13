import { FC } from "react"
import { ScaleSquareProps } from "@/page/App/components/ScaleSquare/interface"
import { applyScaleSquareContainer } from "@/page/App/components/ScaleSquare/style"
import { TransformWidget } from "@/wrappedComponents/TransformWidget"

export const ScaleSquare: FC<ScaleSquareProps> = (props) => {
  const { w, h, componentNode, ...otherProps } = props

  return (
    <div css={applyScaleSquareContainer(h, w)} {...otherProps}>
      <TransformWidget componentNode={componentNode} />
    </div>
  )
}
