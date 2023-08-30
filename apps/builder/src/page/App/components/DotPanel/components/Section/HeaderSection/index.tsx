import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC, useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import RenderComponentCanvasContainer from "@/page/App/components/DotPanel/components/Canvas/renderComponentCanvasContainer"
import { EmptyState } from "@/page/App/components/DotPanel/components/Page/emptyState"
import {
  BASIC_CANVAS_PADDING,
  BODY_MIN_HEIGHT,
  HEADER_MIN_HEIGHT,
  RESIZE_BAR_HEIGHT,
} from "@/page/App/components/DotPanel/constant/canvas"
import { getCurrentDisplayName } from "@/page/App/components/DotPanel/hooks/sectionUtils"
import {
  getIsILLAEditMode,
  getIsILLAProductMode,
} from "@/redux/config/configSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { SECTION_POSITION } from "@/redux/currentApp/editor/components/componentsState"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { trackInEditor } from "@/utils/mixpanelHelper"
import ChangeHorizontalLayoutBar from "../ChangeLayoutBar/HorizontalLayoutBar"
import { containerWrapperStyle, resizeVerticalBarWrapperStyle } from "../style"
import { RenderHeaderSectionProps } from "./interface"
import { applyHeaderSectionWrapperStyle } from "./style"

export const RenderHeaderSection: FC<RenderHeaderSectionProps> = (props) => {
  const {
    sectionNode,
    topHeight,
    containerHeight,
    footerHeight,
    currentPageDisplayName,
    leftPosition,
    rightPosition,
    columnNumber,
  } = props

  const dispatch = useDispatch()

  const executionResult = useSelector(getExecutionResult)
  const isEditMode = useSelector(getIsILLAEditMode)
  const isProductionMode = useSelector(getIsILLAProductMode)
  const sectionNodeProps = executionResult[sectionNode.displayName] || {}
  const {
    viewSortedKey,
    currentViewIndex,
    defaultViewKey,
    sectionViewConfigs,
  } = sectionNodeProps
  let { viewPath } = useParams()
  const currentViewDisplayName = getCurrentDisplayName(
    sectionViewConfigs,
    viewSortedKey,
    defaultViewKey,
    isProductionMode,
    viewPath,
    currentViewIndex,
  )

  const [isInSection, setIsInSection] = useState(false)

  const onMouseEnter = useCallback(() => {
    if (
      isEditMode &&
      (leftPosition === SECTION_POSITION.TOP ||
        leftPosition === SECTION_POSITION.FULL ||
        rightPosition === SECTION_POSITION.TOP ||
        rightPosition === SECTION_POSITION.FULL)
    ) {
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.HOVER, {
        element: "page_arrow",
      })
    }
    setIsInSection(true)
  }, [isEditMode, leftPosition, rightPosition])

  const onMouseLeave = useCallback(() => {
    setIsInSection(false)
  }, [])

  const handleUpdateHeight = useCallback(
    (height: number) => {
      let currentWrapperHeight = height + (isEditMode ? RESIZE_BAR_HEIGHT : 0)
      const tmpBodyHeight =
        containerHeight - footerHeight - currentWrapperHeight

      if (tmpBodyHeight < BODY_MIN_HEIGHT) {
        let bodyHeight = BODY_MIN_HEIGHT
        currentWrapperHeight = containerHeight - footerHeight - bodyHeight
      }

      if (currentWrapperHeight < HEADER_MIN_HEIGHT) {
        currentWrapperHeight = HEADER_MIN_HEIGHT
      }
      dispatch(
        componentsActions.updateTargetPagePropsReducer({
          pageName: currentPageDisplayName,
          newProps: {
            topHeight: currentWrapperHeight,
          },
          notUseUndoRedo: true,
        }),
      )
    },
    [
      containerHeight,
      currentPageDisplayName,
      dispatch,
      footerHeight,
      isEditMode,
    ],
  )

  if (!sectionNodeProps) return null

  const componentNode = sectionNode.childrenNode?.find(
    (node) => node.displayName === currentViewDisplayName,
  )

  return (
    <div
      css={applyHeaderSectionWrapperStyle(`${topHeight}px`, "240px", "500px")}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isInSection &&
        isEditMode &&
        (leftPosition === SECTION_POSITION.TOP ||
          leftPosition === SECTION_POSITION.FULL) && (
          <ChangeHorizontalLayoutBar
            targetSectionName="leftSection"
            sectionName="headerSection"
            direction="left"
            currentPosition={leftPosition}
            currentPageName={currentPageDisplayName}
          />
        )}

      {isInSection &&
        isEditMode &&
        (rightPosition === SECTION_POSITION.TOP ||
          rightPosition === SECTION_POSITION.FULL) && (
          <ChangeHorizontalLayoutBar
            targetSectionName="rightSection"
            sectionName="headerSection"
            direction="right"
            currentPosition={rightPosition}
            currentPageName={currentPageDisplayName}
          />
        )}
      <div css={containerWrapperStyle}>
        {componentNode ? (
          <RenderComponentCanvasContainer
            displayName={componentNode.displayName}
            containerPadding={BASIC_CANVAS_PADDING}
            columnNumber={columnNumber}
            isRootCanvas
            safeRowNumber={0}
            handleUpdateHeight={handleUpdateHeight}
            canResizeCanvas
            minHeight={HEADER_MIN_HEIGHT}
          />
        ) : (
          <EmptyState />
        )}
      </div>
      {isEditMode && <div css={resizeVerticalBarWrapperStyle} />}
    </div>
  )
}
RenderHeaderSection.displayName = "RenderHeaderSection"
