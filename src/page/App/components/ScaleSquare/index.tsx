import { FC } from "react"
import { ScaleSquareProps } from "@/page/App/components/ScaleSquare/interface"
import {
  applyBarPointerStyle,
  applyBorderStyle,
  applyLineStroke,
  applyOuterStyle,
  applySquarePointerStyle,
  applyTransformWidgetStyle,
  getStateColor,
} from "@/page/App/components/ScaleSquare/style"
import { TransformWidget } from "@/wrappedComponents/TransformWidget"
import { useDispatch, useSelector } from "react-redux"
import { configActions } from "@/redux/currentApp/config/configSlice"
import { RootState } from "@/store"

export const ScaleSquare: FC<ScaleSquareProps> = (props) => {
  const { w, h, componentNode, className, ...otherProps } = props
  const scaleSquareState = componentNode.error ? "error" : "normal"
  const dispatch = useDispatch()
  const selected = useSelector<RootState, boolean>((state) => {
    return (
      state.currentApp.config.selectedComponents.findIndex((value) => {
        return value.displayName == componentNode.displayName
      }) != -1
    )
  })
  return (
    <div
      css={applyOuterStyle(h, w)}
      className={className}
      onClick={() => {
        dispatch(configActions.updateSelectedComponent([componentNode]))
      }}
      {...otherProps}
    >
      <div css={applyTransformWidgetStyle()}>
        <TransformWidget componentNode={componentNode} />
      </div>
      <svg
        css={applyBorderStyle(selected, scaleSquareState)}
        width="100%"
        height="100%"
      >
        <line x1="2" y1="2" x2={w - 2} y2="2" />
        <line x1={w - 2} y1="2" x2={w - 2} y2={h - 2} />
        <line x1="2" y1={h - 2} x2={w - 2} y2={h - 2} />
        <line x1="2" y1="2" x2="2" y2={h - 2} />
      </svg>
      <div css={applySquarePointerStyle(selected, scaleSquareState, "tl")} />
      <div css={applySquarePointerStyle(selected, scaleSquareState, "tr")} />
      <div css={applySquarePointerStyle(selected, scaleSquareState, "bl")} />
      <div css={applySquarePointerStyle(selected, scaleSquareState, "br")} />
      <div css={applyBarPointerStyle(selected, scaleSquareState, "l")} />
      <div css={applyBarPointerStyle(selected, scaleSquareState, "t")} />
      <div css={applyBarPointerStyle(selected, scaleSquareState, "r")} />
      <div css={applyBarPointerStyle(selected, scaleSquareState, "b")} />
    </div>
  )
}

ScaleSquare.displayName = "ScaleSquare"
