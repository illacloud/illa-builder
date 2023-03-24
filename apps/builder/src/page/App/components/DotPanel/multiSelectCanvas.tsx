import { getOverlapPoints } from "overlap-area"
import { FC, RefObject, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Selecto, { OnDragStart, SelectoEvents } from "react-selecto"
import {
  getIsILLAProductMode,
  getSelectedComponents,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"

interface MultiSelectCanvasProps {
  containerRef: RefObject<HTMLDivElement>
  currentCanvasRef: RefObject<HTMLDivElement>
  canvasNodeDisplayName: string
}

const transSelectableComponentPointsToIllAPosition = (
  points: number[][],
  scrollTop: number,
  containerX: number,
  containerY: number,
) => {
  const left = points[0][0]
  const top = points[0][1]
  const right = points[1][0]
  const bottom = points[2][1]
  return [
    [left - containerX, top - containerY + scrollTop],
    [right - containerX, top - containerY + scrollTop],
    [right - containerX, bottom - containerY + scrollTop],
    [left - containerX, bottom - containerY + scrollTop],
  ]
}

export const MultiSelectCanvas: FC<MultiSelectCanvasProps> = (props) => {
  const { containerRef, currentCanvasRef, canvasNodeDisplayName } = props
  const containerClientRect = containerRef.current?.getBoundingClientRect()

  const selectStartPositionRef = useRef([0, 0])
  const prevSelectedComponent = useRef<string[]>([])
  const prevSelectorStatus = useRef(false)
  const prevContainerScrollTop = useRef<number | undefined>(undefined)
  const startScrollTop = useRef<number>(0)
  const selectoRef = useRef<Selecto | null>(null)

  const selectedComponents = useSelector(getSelectedComponents)
  const isProductionMode = useSelector(getIsILLAProductMode)
  const dispatch = useDispatch()

  const onScrollHandler = (e: SelectoEvents["scroll"]) => {
    const { direction } = e
    containerRef.current!.scrollBy(0, direction[1] * 10)
  }

  const dragConditionHandler = (e: OnDragStart<unknown>) => {
    const triggerTarget = e.inputEvent.target
    const isRoot = triggerTarget.getAttribute("data-isroot")
    return isRoot === "true"
  }

  const onDragStartHandler = (e: SelectoEvents["dragStart"]) => {
    const scrollTop = containerRef.current?.scrollTop ?? 0
    const startX = e.clientX - (containerClientRect?.x ?? 0)
    const startY = e.clientY - (containerClientRect?.y ?? 0) + scrollTop
    prevContainerScrollTop.current = scrollTop
    startScrollTop.current = scrollTop
    let currentCanvasStyle: CSSStyleDeclaration | undefined =
      currentCanvasRef.current?.style
    selectStartPositionRef.current = [startX, startY]
    currentCanvasStyle?.setProperty("--illa-select-area-left", `${startX}px`)
    currentCanvasStyle?.setProperty("--illa-select-area-top", `${startY}px`)
    prevSelectedComponent.current = selectedComponents
  }

  const onDraggingHandler = (e: SelectoEvents["drag"]) => {
    prevSelectorStatus.current = true
    const { rect, distX, clientY } = e
    let currentCanvasStyle: CSSStyleDeclaration | undefined =
      currentCanvasRef.current?.style
    const containerY = containerClientRect?.y ?? 0
    const containerX = containerClientRect?.x ?? 0
    const scrollTop = containerRef.current?.scrollTop ?? 0
    const currentY = clientY - (containerClientRect?.y ?? 0) + scrollTop
    const startAndDraggingDiff = currentY - selectStartPositionRef.current[1]
    const dir = scrollTop - startScrollTop.current > 0 ? 1 : -1
    const diff = scrollTop - startScrollTop.current!
    const currentHeight =
      Math.abs(currentY - selectStartPositionRef.current[1]) +
      (dir === -1 ? -diff : 0)

    let currentXOrigin = selectStartPositionRef.current[0]
    let currentYOrigin = selectStartPositionRef.current[1]
    if (distX < 0) {
      currentXOrigin += distX
    }
    if (startAndDraggingDiff < 0) {
      currentYOrigin = currentY
    }
    currentCanvasStyle?.setProperty(
      "--illa-select-area-left",
      `${currentXOrigin}px`,
    )
    currentCanvasStyle?.setProperty(
      "--illa-select-area-top",
      `${currentYOrigin}px`,
    )
    currentCanvasStyle?.setProperty(
      "--illa-select-area-width",
      `${rect.width}px`,
    )
    currentCanvasStyle?.setProperty(
      "--illa-select-area-height",
      `${currentHeight}px`,
    )
    const updatedSelectedComponents: string[] = []

    const targets = e.currentTarget.getSelectableElements()
    const rectPoints = [
      // [left,top],[right,top],[right,bottom],[left,bottom]
      [currentXOrigin, currentYOrigin],
      [currentXOrigin + rect.width, currentYOrigin],
      [currentXOrigin + rect.width, currentYOrigin + currentHeight],
      [currentXOrigin, currentYOrigin + currentHeight],
    ]
    targets.forEach((target) => {
      const targetOriginPoints = e.currentTarget.getElementPoints(target)
      const targetPoints = transSelectableComponentPointsToIllAPosition(
        targetOriginPoints,
        scrollTop,
        containerX,
        containerY,
      )
      const points = getOverlapPoints(targetPoints, rectPoints)
      if (points.length > 0) {
        const displayName = target.getAttribute("data-displayname")

        if (displayName) {
          updatedSelectedComponents.push(displayName)
        }
      }
    })
    let isEqual = false
    if (
      updatedSelectedComponents.length === prevSelectedComponent.current.length
    ) {
      isEqual = updatedSelectedComponents.every(
        (value, index) => value === prevSelectedComponent.current[index],
      )
    }
    if (!isEqual) {
      prevSelectedComponent.current = updatedSelectedComponents
      dispatch(configActions.updateSelectedComponent(updatedSelectedComponents))
    }
  }

  const onDragEndHandler = (e: SelectoEvents["dragEnd"]) => {
    if (!prevSelectorStatus.current && !isProductionMode) {
      dispatch(configActions.updateSelectedComponent([]))
    }
    prevSelectorStatus.current = false
    prevContainerScrollTop.current = undefined
    startScrollTop.current = 0
  }

  useEffect(() => {
    if (!containerRef.current || !selectoRef.current) return

    const scrollHandler = (e: Event) => {
      if (!prevSelectorStatus.current) return
      selectoRef.current?.checkScroll()
    }
    containerRef.current.addEventListener("scroll", scrollHandler)

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      containerRef.current?.removeEventListener("scroll", scrollHandler)
    }
  }, [
    containerClientRect?.x,
    containerClientRect?.y,
    containerRef,
    currentCanvasRef,
    dispatch,
  ])

  return (
    <Selecto
      ref={selectoRef}
      container={containerRef.current}
      dragContainer={containerRef.current as Element}
      selectableTargets={[`div[data-parentnode='${canvasNodeDisplayName}']`]}
      onScroll={onScrollHandler}
      scrollOptions={{
        container: containerRef.current!,
        getScrollPosition: () => {
          return [
            containerRef.current!.scrollLeft,
            containerRef.current!.scrollTop,
          ]
        },
        throttleTime: 30,
        threshold: 0,
      }}
      dragCondition={dragConditionHandler}
      onDragStart={onDragStartHandler}
      onDrag={onDraggingHandler}
      onDragEnd={onDragEndHandler}
    />
  )
}
