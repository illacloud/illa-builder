import { getOverlapPoints } from "overlap-area"
import { FC, RefObject, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Selecto, { OnDragStart, SelectoEvents } from "react-selecto"
import {
  getIsILLAProductMode,
  getSelectedComponents,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { clearComponentAttachedUsersHandler } from "@/redux/currentApp/collaborators/collaboratorsHandlers"

interface MultiSelectCanvasProps {
  containerRef: RefObject<HTMLDivElement>
  currentCanvasRef: RefObject<HTMLDivElement>
  canvasNodeDisplayName: string
}

export const MultiSelectCanvas: FC<MultiSelectCanvasProps> = (props) => {
  const { containerRef, currentCanvasRef, canvasNodeDisplayName } = props
  const containerClientRect = containerRef.current?.getBoundingClientRect()

  const selectStartPositionRef = useRef([0, 0])
  const prevSelectedComponent = useRef<string[]>([])
  const prevSelectorStatus = useRef(false)
  const selectedComponents = useSelector(getSelectedComponents)
  const isProductionMode = useSelector(getIsILLAProductMode)
  const dispatch = useDispatch()

  const onScrollHandler = (e: SelectoEvents["scroll"]) => {
    const { direction } = e
    containerRef.current!.scrollBy(direction[0] * 10, direction[1] * 10)
  }

  const dragConditionHandler = (e: OnDragStart<unknown>) => {
    const triggerTarget = e.inputEvent.target
    const isRoot = triggerTarget.getAttribute("data-isroot")
    if (isRoot === "true") return true
    return false
  }

  const onDragStartHandler = (e: SelectoEvents["dragStart"]) => {
    const scrollTop = containerRef.current?.scrollTop ?? 0
    const startX = e.clientX - (containerClientRect?.x ?? 0)
    const startY = e.clientY - (containerClientRect?.y ?? 0) + scrollTop
    let currentCanvasStyle: CSSStyleDeclaration | undefined =
      currentCanvasRef.current?.style
    selectStartPositionRef.current = [startX, startY]
    currentCanvasStyle?.setProperty("--illa-select-area-left", `${startX}px`)
    currentCanvasStyle?.setProperty("--illa-select-area-top", `${startY}px`)
    prevSelectedComponent.current = selectedComponents
  }

  const onDraggingHandler = (e: SelectoEvents["drag"]) => {
    prevSelectorStatus.current = true
    const { rect, distX, distY } = e
    let currentCanvasStyle: CSSStyleDeclaration | undefined =
      currentCanvasRef.current?.style

    let currentXOrigin = selectStartPositionRef.current[0]
    let currentYOrigin = selectStartPositionRef.current[1]
    if (distX < 0) {
      currentXOrigin += distX
    }
    if (distY < 0) {
      currentYOrigin += distY
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
      `${rect.height}px`,
    )
    const updatedSelectedComponents: string[] = []

    const targets = e.currentTarget.getSelectableElements()
    const rectPoints = [
      [rect.left, rect.top],
      [rect.right, rect.top],
      [rect.right, rect.bottom],
      [rect.left, rect.bottom],
    ]
    targets.forEach((target) => {
      const points = getOverlapPoints(
        e.currentTarget.getElementPoints(target),
        rectPoints,
      )
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
      clearComponentAttachedUsersHandler(selectedComponents || [])
    }
    prevSelectorStatus.current = false
  }

  return (
    <Selecto
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
