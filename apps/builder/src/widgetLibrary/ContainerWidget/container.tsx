import { FC, useCallback, useEffect, useMemo, useRef } from "react"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/renderComponentCanvas"
import { BasicContainer } from "@/widgetLibrary/BasicContainer/BasicContainer"
import { ContainerProps } from "@/widgetLibrary/ContainerWidget/interface"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { ContainerEmptyState } from "./emptyState"
import { containerWrapperStyle } from "./style"

export const ContainerWidget: FC<ContainerProps> = (props) => {
  const {
    currentIndex,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    handleUpdateOriginalDSLMultiAttr,
    displayName,
    viewList,
    tooltipText,
    childrenNode,
    blockColumns,
    dynamicHeight = "fixed",
    triggerEventHandler,
    updateComponentHeight,
    dynamicMaxHeight,
    dynamicMinHeight,
    h,
  } = props
  const preCurrentViewIndex = useRef<number>(currentIndex)
  useEffect(() => {
    if (typeof preCurrentViewIndex.current !== "number") {
      preCurrentViewIndex.current = currentIndex
    }
    if (preCurrentViewIndex.current !== currentIndex) {
      triggerEventHandler("change")
      preCurrentViewIndex.current = currentIndex
    }
  }, [currentIndex, triggerEventHandler])

  const handleOnClick = useCallback(() => {
    triggerEventHandler("click")
  }, [triggerEventHandler])

  const renderComponent = useMemo(() => {
    if (Array.isArray(childrenNode) && currentIndex < childrenNode.length) {
      const currentViewComponentNode = childrenNode[currentIndex]
      return (
        <BasicContainer
          componentNode={currentViewComponentNode}
          // 8 is the padding of the container , 7 is padding of the wrapper container
          minHeight={h * UNIT_HEIGHT - 7 - 8}
          padding={4}
          safeRowNumber={1}
          addedRowNumber={1}
          blockColumns={blockColumns}
        />
      )
    }
    return <ContainerEmptyState />
  }, [blockColumns, childrenNode, currentIndex, h])

  useEffect(() => {
    handleUpdateGlobalData?.(displayName, {
      currentIndex,
      viewList,
      setCurrentViewKey: (key: string) => {
        const index = viewList.findIndex((viewItem) => viewItem.key === key)
        if (index === -1) return
        handleUpdateOriginalDSLMultiAttr({
          currentIndex: index,
          currentKey: key,
        })
      },
      setCurrentViewIndex: (index: string) => {
        const numberIndex = parseInt(index)
        const view = viewList[numberIndex]
        if (!view) return
        handleUpdateOriginalDSLMultiAttr({
          currentIndex: numberIndex,
          currentKey: view.key,
        })
      },
      showNextView: (loop: boolean) => {
        let newCurrentIndex = currentIndex + 1
        if (newCurrentIndex >= viewList.length) {
          if (!loop) return
          newCurrentIndex = 0
        }
        const currentView = viewList[newCurrentIndex]
        handleUpdateOriginalDSLMultiAttr({
          currentIndex: newCurrentIndex,
          currentKey: currentView.key,
        })
      },
      showNextVisibleView: (loop: boolean) => {
        let newCurrentIndex = currentIndex + 1
        if (newCurrentIndex >= viewList.length) {
          if (!loop) return
          newCurrentIndex = 0
        }
        let currentView = viewList[newCurrentIndex]
        while (currentView.hidden || currentView.disabled) {
          newCurrentIndex++
          currentView = viewList[newCurrentIndex]
          if (newCurrentIndex >= viewList.length) {
            if (!loop) return
            newCurrentIndex = 0
          }
        }
        handleUpdateOriginalDSLMultiAttr({
          currentIndex: newCurrentIndex,
          currentKey: currentView.key,
        })
      },
      showPreviousView: (loop: boolean) => {
        let newCurrentIndex = currentIndex - 1

        if (newCurrentIndex < 0) {
          if (!loop) return
          newCurrentIndex = viewList.length - 1
        }
        const currentView = viewList[newCurrentIndex]
        handleUpdateOriginalDSLMultiAttr({
          currentIndex: newCurrentIndex,
          currentKey: currentView.key,
        })
      },
      showPreviousVisibleView: (loop: boolean) => {
        let newCurrentIndex = currentIndex - 1

        if (newCurrentIndex < 0) {
          if (!loop) return
          newCurrentIndex = viewList.length - 1
        }
        let currentView = viewList[newCurrentIndex]
        while (currentView.hidden || currentView.disabled) {
          newCurrentIndex--
          currentView = viewList[newCurrentIndex]
          if (newCurrentIndex < 0) {
            if (!loop) return
            newCurrentIndex = viewList.length - 1
          }
        }

        handleUpdateOriginalDSLMultiAttr({
          currentIndex: newCurrentIndex,
          currentKey: currentView.key,
        })
      },
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    currentIndex,
    displayName,
    handleDeleteGlobalData,
    handleUpdateGlobalData,
    handleUpdateOriginalDSLMultiAttr,
    viewList,
  ])

  const enableAutoHeight = useMemo(() => {
    switch (dynamicHeight) {
      case "auto":
        return true
      case "limited":
        return h * UNIT_HEIGHT >= (dynamicMinHeight ?? h * UNIT_HEIGHT)
      case "fixed":
      default:
        return false
    }
  }, [dynamicHeight, dynamicMinHeight, h])

  const dynamicOptions = {
    dynamicMinHeight,
    dynamicMaxHeight,
  }

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div css={containerWrapperStyle} onClick={handleOnClick}>
        <AutoHeightContainer
          updateComponentHeight={updateComponentHeight}
          enable={enableAutoHeight}
          dynamicOptions={dynamicOptions}
        >
          {renderComponent}
        </AutoHeightContainer>
      </div>
    </TooltipWrapper>
  )
}
