import { FC, useRef, useMemo, useEffect } from "react"
import { ContainerProps } from "@/widgetLibrary/ContainerWidget/interface"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { BasicContainer } from "@/widgetLibrary/BasicContainer/BasicContainer"
import { ContainerEmptyState } from "./emptyState"

export const ContainerWidget: FC<ContainerProps> = (props) => {
  const {
    handleOnClick,
    currentViewIndex,
    handleOnChange,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    handleUpdateOriginalDSLMultiAttr,
    displayName,
    viewList,
    tooltipText,
    childrenNode,
  } = props
  const preCurrentViewIndex = useRef<number>(currentViewIndex)

  useEffect(() => {
    if (!preCurrentViewIndex.current) {
      preCurrentViewIndex.current = currentViewIndex
    }
    if (preCurrentViewIndex.current !== currentViewIndex) {
      handleOnChange()
      preCurrentViewIndex.current = currentViewIndex
    }
  }, [currentViewIndex, handleOnChange, handleOnClick])

  const renderComponent = useMemo(() => {
    const currentIndex = currentViewIndex
    if (Array.isArray(childrenNode) && currentIndex < childrenNode.length) {
      const currentViewComponentNode = childrenNode[currentIndex]
      return <BasicContainer componentNode={currentViewComponentNode} />
    }
    return <ContainerEmptyState />
  }, [childrenNode, currentViewIndex])

  useEffect(() => {
    handleUpdateGlobalData?.(displayName, {
      currentViewIndex,
      viewList,
      setCurrentViewKey: (key: string) => {
        const index = viewList.findIndex((viewItem) => viewItem.key === key)
        if (index === -1) return
        handleUpdateOriginalDSLMultiAttr({
          currentViewIndex: index,
          currentViewKey: key,
        })
      },
      setCurrentViewIndex: (index: string) => {
        const numberIndex = parseInt(index)
        const view = viewList[numberIndex]
        if (!view) return
        handleUpdateOriginalDSLMultiAttr({
          currentViewIndex: numberIndex,
          currentViewKey: view.key,
        })
      },
      showNextView: (loop: boolean) => {
        let currentIndex = currentViewIndex + 1
        if (currentIndex >= viewList.length) {
          if (!loop) return
          currentIndex = 0
        }
        const currentView = viewList[currentIndex]
        handleUpdateOriginalDSLMultiAttr({
          currentViewIndex: currentIndex,
          currentViewKey: currentView.key,
        })
      },
      showNextVisibleView: (loop: boolean) => {
        let currentIndex = currentViewIndex + 1
        if (currentIndex >= viewList.length) {
          if (!loop) return
          currentIndex = 0
        }
        let currentView = viewList[currentIndex]
        while (currentView.hidden || currentView.disabled) {
          currentIndex++
          currentView = viewList[currentIndex]
          if (currentIndex >= viewList.length) {
            if (!loop) return
            currentIndex = 0
          }
        }
        handleUpdateOriginalDSLMultiAttr({
          currentViewIndex: currentIndex,
          currentViewKey: currentView.key,
        })
      },
      showPreviousView: (loop: boolean) => {
        let currentIndex = currentViewIndex - 1

        if (currentIndex < 0) {
          if (!loop) return
          currentIndex = viewList.length - 1
        }
        const currentView = viewList[currentIndex]
        handleUpdateOriginalDSLMultiAttr({
          currentViewIndex: currentIndex,
          currentViewKey: currentView.key,
        })
      },
      showPreviousVisibleView: (loop: boolean) => {
        let currentIndex = currentViewIndex - 1

        if (currentIndex < 0) {
          if (!loop) return
          currentIndex = viewList.length - 1
        }
        let currentView = viewList[currentIndex]
        while (currentView.hidden || currentView.disabled) {
          currentIndex--
          currentView = viewList[currentIndex]
          if (currentIndex < 0) {
            if (!loop) return
            currentIndex = viewList.length - 1
          }
        }

        handleUpdateOriginalDSLMultiAttr({
          currentViewIndex: currentIndex,
          currentViewKey: currentView.key,
        })
      },
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    currentViewIndex,
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
