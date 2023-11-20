import {
  applyBarHandlerStyle,
  applyBarPointerStyle,
} from "@/page/App/components/ScaleSquare/style"
import { getIsILLAEditMode } from "@/redux/config/configSelector"
import store from "@/store"

export const resizeBottomHandler = () => {
  const rootState = store.getState()
  const isEditMode = getIsILLAEditMode(rootState)
  const scaleSquareState = !isEditMode ? "production" : "normal"
  return {
    bottom: (
      <div css={applyBarHandlerStyle(true, scaleSquareState, "b")}>
        <div
          className="handler"
          css={applyBarPointerStyle(true, scaleSquareState, "b")}
        />
      </div>
    ),
  }
}
