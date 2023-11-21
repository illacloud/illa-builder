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

export const getPaddingByShadow = (itemShadow?: ShadowOptions) => {
  let padding
  switch (itemShadow) {
    case "large": {
      padding = "20px"
      break
    }
    case "medium": {
      padding = "16px"
      break
    }
    case "small": {
      padding = "4px"
      break
    }
    case "none":
    default:
      padding = "1px"
  }
  return padding
}
