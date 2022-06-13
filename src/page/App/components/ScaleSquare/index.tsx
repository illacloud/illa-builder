import { FC } from "react"
import { ScaleSquareProps } from "@/page/App/components/ScaleSquare/interface"
import { applyScaleSquareContainerStyle } from "@/page/App/components/ScaleSquare/style"
import { TransformWidget } from "@/wrappedComponents/TransformWidget"
import { useDispatch } from "react-redux"
import { configActions } from "@/redux/currentApp/config/configSlice"

export const ScaleSquare: FC<ScaleSquareProps> = (props) => {
  const { w, h, componentNode, ...otherProps } = props
  const dispatch = useDispatch()
  return (
    <div
      css={applyScaleSquareContainerStyle(h, w)}
      onClick={() => {
        dispatch(configActions.updateSelectedComponent([componentNode]))
      }}
      {...otherProps}
    >
      <TransformWidget componentNode={componentNode} />
    </div>
  )
}
