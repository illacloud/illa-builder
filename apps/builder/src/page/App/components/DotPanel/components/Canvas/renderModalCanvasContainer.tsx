import { FC, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import useMeasure from "react-use-measure"
import ComponentParser from "@/page/App/components/DotPanel/components/ComponentParser"
import { DEFAULT_BODY_COLUMNS_NUMBER } from "@/page/App/components/DotPanel/constant/canvas"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { getClientWidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoSelector"
import { RenderComponentCanvasContainerProps } from "./interface"
import { maskStyle, outerModalCanvasContainerStyle } from "./style"

export const RenderModalCanvasContainer: FC<
  RenderComponentCanvasContainerProps
> = (props) => {
  const {
    columnNumber = DEFAULT_BODY_COLUMNS_NUMBER,
    displayName,
    containerPadding,
  } = props

  const executionResult = useSelector(getExecutionResult)

  const dispatch = useDispatch()

  const [canvasRef, bounds] = useMeasure()

  const unitWidth = bounds.width / columnNumber

  const layoutInfos = useSelector(getClientWidgetLayoutInfo)

  const currentLayoutInfo = layoutInfos[displayName]

  const currentModalDisplayName = currentLayoutInfo.childrenNode?.find(
    (childName) => {
      const childNode = executionResult[childName]
      return childNode?.isVisible
    },
  )

  const currentModal = executionResult[currentModalDisplayName ?? ""] ?? {}

  const onClickMaskToClose = useCallback(() => {
    if (currentModal?.clickMaskClose && currentModalDisplayName) {
      dispatch(
        executionActions.updateModalDisplayReducer({
          display: false,
          displayName: currentModalDisplayName,
        }),
      )
    }
  }, [currentModal?.clickMaskClose, currentModalDisplayName, dispatch])

  if (!currentModal?.isVisible) {
    return null
  }

  return (
    <div
      css={outerModalCanvasContainerStyle(containerPadding)}
      ref={canvasRef}
      onClick={onClickMaskToClose}
    >
      {currentModal && (
        <ComponentParser
          key={`${displayName}-${currentModal.displayName}}`}
          displayName={currentModal.displayName}
          unitW={unitWidth}
          parentNodeDisplayName={displayName}
          columnNumber={columnNumber}
        />
      )}
      <div css={maskStyle} />
    </div>
  )
}
