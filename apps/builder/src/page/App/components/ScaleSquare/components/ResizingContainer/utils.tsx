import { ScaleSquareType } from "@/page/App/components/ScaleSquare/interface"
import {
  applyBarHandlerStyle,
  applyBarPointerStyle,
  applySquarePointerStyle,
} from "@/page/App/components/ScaleSquare/style"
import { RESIZE_DIRECTION } from "@/widgetLibrary/interface"

export const getScaleSquareState = (hasError: boolean, isEditMode: boolean) => {
  if (isEditMode) {
    return hasError ? "error" : "normal"
  }
  return "production"
}

export const getResizeHandler = (
  resizeDirection: RESIZE_DIRECTION,
  isSelected: boolean,
  scaleSquareState: ScaleSquareType,
) => {
  switch (resizeDirection) {
    case RESIZE_DIRECTION.HORIZONTAL: {
      return {
        right: (
          <div css={applyBarHandlerStyle(isSelected, scaleSquareState, "r")}>
            <div
              className="handler"
              css={applyBarPointerStyle(isSelected, scaleSquareState, "r")}
            />
          </div>
        ),
        left: (
          <div css={applyBarHandlerStyle(isSelected, scaleSquareState, "l")}>
            <div
              className="handler"
              css={applyBarPointerStyle(isSelected, scaleSquareState, "l")}
            />
          </div>
        ),
      }
    }
    case RESIZE_DIRECTION.VERTICAL: {
      return {
        top: (
          <div css={applyBarHandlerStyle(isSelected, scaleSquareState, "t")}>
            <div
              className="handler"
              css={applyBarPointerStyle(isSelected, scaleSquareState, "t")}
            />
          </div>
        ),
        bottom: (
          <div css={applyBarHandlerStyle(isSelected, scaleSquareState, "b")}>
            <div
              className="handler"
              css={applyBarPointerStyle(isSelected, scaleSquareState, "b")}
            />
          </div>
        ),
      }
    }
    case RESIZE_DIRECTION.ALL:
    default: {
      return {
        topLeft: (
          <div
            css={applySquarePointerStyle(isSelected, scaleSquareState, "tl")}
          />
        ),
        top: (
          <div css={applyBarHandlerStyle(isSelected, scaleSquareState, "t")}>
            <div
              className="handler"
              css={applyBarPointerStyle(isSelected, scaleSquareState, "t")}
            />
          </div>
        ),
        topRight: (
          <div
            css={applySquarePointerStyle(isSelected, scaleSquareState, "tr")}
          />
        ),
        right: (
          <div css={applyBarHandlerStyle(isSelected, scaleSquareState, "r")}>
            <div
              className="handler"
              css={applyBarPointerStyle(isSelected, scaleSquareState, "r")}
            />
          </div>
        ),
        bottomRight: (
          <div
            css={applySquarePointerStyle(isSelected, scaleSquareState, "br")}
          />
        ),
        bottom: (
          <div css={applyBarHandlerStyle(isSelected, scaleSquareState, "b")}>
            <div
              className="handler"
              css={applyBarPointerStyle(isSelected, scaleSquareState, "b")}
            />
          </div>
        ),
        bottomLeft: (
          <div
            css={applySquarePointerStyle(isSelected, scaleSquareState, "bl")}
          />
        ),
        left: (
          <div css={applyBarHandlerStyle(isSelected, scaleSquareState, "l")}>
            <div
              className="handler"
              css={applyBarPointerStyle(isSelected, scaleSquareState, "l")}
            />
          </div>
        ),
      }
    }
  }
}
