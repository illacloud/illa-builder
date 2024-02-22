import {
  applyBarHandlerStyle,
  applyBarPointerStyle,
} from "@/page/App/components/ScaleSquare/style"
import { getIsILLAEditMode } from "@/redux/config/configSelector"
import store from "@/store"
import { ShadowOptions } from "./interface"

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

export const getGapByShadow = (itemShadow?: ShadowOptions) => {
  switch (itemShadow) {
    case "large": {
      return 20
    }
    case "medium": {
      return 16
    }
    case "small": {
      return 4
    }
    case "none":
    default:
      return 1
  }
}
