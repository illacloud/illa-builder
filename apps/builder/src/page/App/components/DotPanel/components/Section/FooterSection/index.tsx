import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC, useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import RenderComponentCanvasContainer from "@/page/App/components/DotPanel/components/Canvas/renderComponentCanvasContainer"
import { EmptyState } from "@/page/App/components/DotPanel/components/Page/emptyState"
import {
  BASIC_CANVAS_PADDING,
  BODY_MIN_HEIGHT,
  FOOTER_MIN_HEIGHT,
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
import { RenderFooterSectionProps } from "./interface"
import { applyFooterSectionWrapperStyle } from "./style"

export const RenderFooterSection: FC<RenderFooterSectionProps> = (props) => {
  const {
    sectionNode,
    bottomHeight,
    containerHeight,
    headerHeight,
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

  const componentNode = sectionNode.childrenNode?.find(
    (node) => node.displayName === currentViewDisplayName,
  )

  const [isInSection, setIsInSection] = useState(false)

  const onMouseEnter = useCallback(() => {
    if (
      isEditMode &&
      (leftPosition === SECTION_POSITION.BOTTOM ||
        leftPosition === SECTION_POSITION.FULL ||
        rightPosition === SECTION_POSITION.BOTTOM ||
        rightPosition === SECTION_POSITION.FULL)
    ) {
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.HOVER, {
        element: "page_arrow",
      })
    }

    setIsInSection(true)
  }, [leftPosition, isEditMode, rightPosition])

  const handleUpdateHeight = useCallback(
    (height: number) => {
      let currentWrapperHeight = height + (isEditMode ? RESIZE_BAR_HEIGHT : 0)
      const tmpBodyHeight =
        containerHeight - headerHeight - currentWrapperHeight
      if (currentWrapperHeight < FOOTER_MIN_HEIGHT) {
        currentWrapperHeight = FOOTER_MIN_HEIGHT
      }

      if (tmpBodyHeight < BODY_MIN_HEIGHT) {
        let bodyHeight = BODY_MIN_HEIGHT
        currentWrapperHeight = containerHeight - headerHeight - bodyHeight
      }

      dispatch(
        componentsActions.updateTargetPagePropsReducer({
          pageName: currentPageDisplayName,
          newProps: {
            bottomHeight: currentWrapperHeight,
          },
          notUseUndoRedo: true,
        }),
      )
    },
    [
      containerHeight,
      currentPageDisplayName,
      dispatch,
      headerHeight,
      isEditMode,
    ],
  )

  const onMouseLeave = useCallback(() => {
    setIsInSection(false)
  }, [])

  return (
    <div
      css={applyFooterSectionWrapperStyle(
        `${bottomHeight}px`,
        "240px",
        "500px",
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isInSection &&
        isEditMode &&
        (leftPosition === SECTION_POSITION.BOTTOM ||
          leftPosition === SECTION_POSITION.FULL) && (
          <ChangeHorizontalLayoutBar
            targetSectionName="leftSection"
            sectionName="footerSection"
            direction="left"
            currentPosition={leftPosition}
            currentPageName={currentPageDisplayName}
          />
        )}
      {isInSection &&
        isEditMode &&
        (rightPosition === SECTION_POSITION.BOTTOM ||
          rightPosition === SECTION_POSITION.FULL) && (
          <ChangeHorizontalLayoutBar
            targetSectionName="rightSection"
            sectionName="footerSection"
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
            minHeight={FOOTER_MIN_HEIGHT}
          />
        ) : (
          <EmptyState />
        )}
      </div>
      {isEditMode && <div css={resizeVerticalBarWrapperStyle} />}
    </div>
  )
}
RenderFooterSection.displayName = "RenderHeaderSection"
