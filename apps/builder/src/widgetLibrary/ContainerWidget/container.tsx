import { FC, useRef, useMemo, useEffect } from "react"
import { ContainerProps } from "@/widgetLibrary/ContainerWidget/interface"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { BasicContainer } from "@/widgetLibrary/BasicContainer/BasicContainer"
import { ContainerEmptyState } from "./emptyState"

export const ContainerWidget: FC<ContainerProps> = (props) => {
  const {
    handleOnClick,
    currentIndex,
    handleOnChange,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    handleUpdateOriginalDSLMultiAttr,
    displayName,
    viewList,
    tooltipText,
    childrenNode,
    h,
    unitH,
  } = props
  const preCurrentViewIndex = useRef<number>(currentIndex)

  useEffect(() => {
    if (typeof preCurrentViewIndex.current !== "number") {
      preCurrentViewIndex.current = currentIndex
    }
    if (preCurrentViewIndex.current !== currentIndex) {
      handleOnChange()
      preCurrentViewIndex.current = currentIndex
    }
  }, [currentIndex, handleOnChange, handleOnClick])

  const renderComponent = useMemo(() => {
    if (Array.isArray(childrenNode) && currentIndex < childrenNode.length) {
      const currentViewComponentNode = childrenNode[currentIndex]
      return (
        <BasicContainer
          componentNode={currentViewComponentNode}
          minHeight={h * unitH}
          padding={4}
        />
      )
    }
    return <ContainerEmptyState />
  }, [childrenNode, currentIndex, h, unitH])

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

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <span>{renderComponent}</span>
    </TooltipWrapper>
  )
}
