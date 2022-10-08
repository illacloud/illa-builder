import { FC, useRef, useMemo, useEffect } from "react"
import { RenderComponentCanvas } from "@/page/App/components/DotPanel/renderComponentCanvas"
import { cloneDeep } from "lodash"
import { ContainerProps } from "@/widgetLibrary/ContainerWidget/interface"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"

export const ContainerWidget: FC<ContainerProps> = (props) => {
  const {
    handleOnClick,
    currentViewIndex,
    viewComponentsArray,
    componentNode,
    handleOnChange,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    handleUpdateDsl,
    displayName,
    viewList,
    tooltipText,
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

  const containerRef = useRef<HTMLDivElement>(null)
  const currentViewComponents = useMemo(() => {
    const currentIndex = currentViewIndex
    const currentViewComponentsArray = viewComponentsArray
    if (
      Array.isArray(currentViewComponentsArray) &&
      currentIndex < currentViewComponentsArray.length
    ) {
      return currentViewComponentsArray[currentIndex]
    }
    return []
  }, [currentViewIndex, viewComponentsArray])

  const finalCurrentComponentNode = useMemo(() => {
    return currentViewComponents
      .map((displayName) => {
        return componentNode.childrenNode?.find((node) => {
          return node.displayName === displayName
        })
      })
      .filter((node) => !!node)
  }, [currentViewComponents, componentNode])

  const finalComponentNode = useMemo(() => {
    const currentComponentNode = cloneDeep(componentNode)
    return {
      ...currentComponentNode,
      childrenNode: finalCurrentComponentNode,
    } as ComponentNode
  }, [componentNode, finalCurrentComponentNode])

  useEffect(() => {
    handleUpdateGlobalData?.(displayName, {
      currentViewIndex,
      viewList,
      setCurrentViewKey: (key: string) => {
        const index = viewList.findIndex((viewItem) => viewItem.key === key)
        if (index === -1) return
        handleUpdateDsl({ currentViewIndex: index, currentViewKey: key })
      },
      setCurrentViewIndex: (index: string) => {
        const numberIndex = parseInt(index)
        const view = viewList[numberIndex]
        if (!view) return
        handleUpdateDsl({
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
        handleUpdateDsl({
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
        const currentView = viewList[currentIndex]
        handleUpdateDsl({
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
        handleUpdateDsl({
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
        const currentView = viewList[currentIndex]
        handleUpdateDsl({
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
    handleUpdateDsl,
    handleUpdateGlobalData,
    viewList,
  ])

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div
        ref={containerRef}
        style={{
          padding: "4px",
          width: "100%",
          height: "100%",
        }}
        onClick={handleOnClick}
      >
        <RenderComponentCanvas
          componentNode={finalComponentNode}
          containerPadding={4}
          containerRef={containerRef}
          minHeight={props.componentNode.h * props.componentNode.unitH - 6}
        />
      </div>
    </TooltipWrapper>
  )
}
