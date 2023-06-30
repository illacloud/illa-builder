import {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { useDrop } from "react-dnd"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useScroll } from "react-use"
import useMeasure from "react-use-measure"
import { useMessage } from "@illa-design/react"
import { ComponentParser } from "@/page/App/components/DotPanel/components/ComponentParser"
import DragPreview from "@/page/App/components/DotPanel/components/DragPreview"
import { DragShadowPreview } from "@/page/App/components/DotPanel/components/DragShadowPreview"
import { MousePreview } from "@/page/App/components/DotPanel/components/MousePreview"
import { MultiSelectCanvas } from "@/page/App/components/DotPanel/components/MultiSelectCanvas"
import { MultiSelectedScaleSquare } from "@/page/App/components/DotPanel/components/MultiSelectedContainer"
import {
  ADD_ROWS,
  DEFAULT_BODY_COLUMNS_NUMBER,
  SAFE_ROWS,
  SCROLL_CONTAINER_PADDING,
  UNIT_HEIGHT,
} from "@/page/App/components/DotPanel/constant/canvas"
import { useMousePositionAsync } from "@/page/App/components/DotPanel/hooks/useMousePostionAsync"
import { clamWidgetShape } from "@/page/App/components/DotPanel/utils/getDragShadow"
import { getLayoutInfosWithRelativeCombineShape } from "@/page/App/components/DotPanel/utils/getDropResult"
import { sendMousePositionHandler } from "@/page/App/components/DotPanel/utils/sendBinaryMessage"
import {
  DRAG_EFFECT,
  DragInfo,
} from "@/page/App/components/ScaleSquare/components/DragContainer/interface"
import {
  getIsILLAEditMode,
  getIsLikeProductMode,
  getSelectedComponents,
  isShowDot,
} from "@/redux/config/configSelector"
import { searchDSLByDisplayName } from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import {
  getCurrentPageDisplayName,
  getExecutionWidgetLayoutInfo,
  getIsDragging,
} from "@/redux/currentApp/executionTree/executionSelector"
import { FocusManager } from "@/utils/focusManager"
import { newGenerateComponentNode } from "@/utils/generators/generateComponentNode"
import { getMousePointerPosition } from "../../calc"
import {
  removeScrollBarContainerControllerByDisplayName,
  setScrollBarContainerController,
} from "../../context/scrollBarContext"
import {
  DropCollectedProps,
  DropResultInfo,
  RenderComponentCanvasContainerProps,
} from "./interface"
import {
  applyComponentCanvasStyle,
  componentCanvasContainerStyle,
  containerShapeStyle,
  dropZoneStyle,
  outerComponentCanvasContainerStyle,
  selectoSelectionStyle,
} from "./style"

export const RenderComponentCanvasContainer: FC<
  RenderComponentCanvasContainerProps
> = (props) => {
  const {
    columnNumber = DEFAULT_BODY_COLUMNS_NUMBER,
    isRootCanvas,
    displayName,
    containerPadding,
  } = props

  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const firstDragRef = useRef(true)
  const dragStartScrollTop = useRef(0)
  const { y: scrollContainerScrollTop } = useScroll(scrollContainerRef)
  const currentPageDisplayName = useSelector(getCurrentPageDisplayName)
  const [canvasRef, bounds] = useMeasure()
  const messageHandler = useMessage()
  const { t } = useTranslation()
  const fixedBounds = {
    top: bounds.top + containerPadding + SCROLL_CONTAINER_PADDING,
    left: bounds.left + containerPadding + SCROLL_CONTAINER_PADDING,
    width: bounds.width - (containerPadding + SCROLL_CONTAINER_PADDING) * 2,
    height: bounds.height - (containerPadding + SCROLL_CONTAINER_PADDING) * 2,
  }
  const canShowDot = useSelector(isShowDot)
  const unitWidth = fixedBounds.width / columnNumber

  const [canvasHeight, setCanvasHeight] = useState<number>(fixedBounds.height)
  const widgetLayoutInfo = useSelector(getExecutionWidgetLayoutInfo)
  const childWidgetLayoutInfo = Object.values(widgetLayoutInfo).filter(
    (item) => item.parentNode === displayName,
  )
  const selectedComponents = useSelector(getSelectedComponents)

  const dispatch = useDispatch()
  const isDraggingGlobal = useSelector(getIsDragging)
  const isLikeProductMode = useSelector(getIsLikeProductMode)

  const isEditMode = useSelector(getIsILLAEditMode)
  const layoutInfos = useSelector(getExecutionWidgetLayoutInfo)

  const currentLayoutInfo = layoutInfos[displayName]

  const [collectedProps, dropRef] = useDrop<
    DragInfo,
    DropResultInfo,
    DropCollectedProps
  >(
    () => ({
      accept: ["components"],
      canDrop: () => {
        return isEditMode
      },
      hover: (dragItem, monitor) => {
        if (dragItem.dropResult) {
          if (!dragItem.dropResult || !dragItem.dropResult.shape) return
          const { shape } = dragItem.dropResult

          const bottom = (shape.y + shape.previewH) * UNIT_HEIGHT
          const mouseOffset = monitor.getClientOffset() ?? {
            x: 0,
            y: 0,
          }
          if (isRootCanvas && mouseOffset.y > fixedBounds.height - 100) {
            setCanvasHeight(bottom + 5 * ADD_ROWS)
          }
        }
      },
      drop: (dropItem, monitor) => {
        const didDrop = monitor.didDrop()
        if (
          !monitor.isOver({
            shallow: true,
          }) &&
          didDrop
        ) {
          return {
            isDropOnCanvas: !!monitor.getDropResult()?.isDropOnCanvas,
          }
        }

        const { draggedComponents, dropResult, dragEffect } = dropItem
        const originParentNode = draggedComponents[0].parentNode

        if (dropResult && !dropResult.shape && !dropResult.canDrop) {
          messageHandler.error({
            content: t("frame.message.session.error"),
          })
          return {
            isDropOnCanvas: false,
          }
        }

        if (!dropResult || !dropResult.shape) {
          return {
            isDropOnCanvas: false,
          }
        }

        const { shape: dropResultShape } = dropResult

        if (draggedComponents.length === 1) {
          switch (dragEffect) {
            case DRAG_EFFECT.ADD: {
              const newComponentNode = newGenerateComponentNode(
                dropResultShape.x,
                dropResultShape.y,
                dropResultShape.w,
                unitWidth,
                draggedComponents[0].widgetType,
                draggedComponents[0].displayName,
                displayName,
              )

              if (newComponentNode.type === "MODAL_WIDGET") {
                dispatch(
                  componentsActions.addModalComponentReducer({
                    currentPageDisplayName,
                    modalComponentNode: newComponentNode,
                  }),
                )
              } else {
                dispatch(
                  componentsActions.addComponentReducer([newComponentNode]),
                )
              }

              break
            }
            case DRAG_EFFECT.UPDATE: {
              const updateSlices = [
                {
                  displayName: draggedComponents[0].displayName,
                  x: dropResultShape.x,
                  y: dropResultShape.y,
                  w: dropResultShape.w,
                  h: draggedComponents[0].layoutInfo.h,
                },
              ]
              dispatch(
                componentsActions.updateComponentContainerReducer({
                  oldParentNodeDisplayName: originParentNode,
                  newParentNodeDisplayName: displayName,
                  updateSlices,
                }),
              )
            }
          }
        }

        if (draggedComponents.length > 1) {
          switch (dragEffect) {
            case DRAG_EFFECT.ADD: {
            }

            case DRAG_EFFECT.UPDATE: {
              const relativeLayoutInfo =
                getLayoutInfosWithRelativeCombineShape(draggedComponents)

              const updateSlices = relativeLayoutInfo.map((item) => {
                const shape = clamWidgetShape(
                  {
                    x: item.layoutInfo.x + dropResultShape.x,
                    y: item.layoutInfo.y + dropResultShape.y,
                    w: item.layoutInfo.w,
                    h: item.layoutInfo.h,
                  },
                  columnNumber,
                  draggedComponents.length > 1,
                )
                return {
                  ...shape,
                  h: shape.previewH,
                  displayName: item.displayName,
                }
              })
              dispatch(
                componentsActions.updateComponentContainerReducer({
                  oldParentNodeDisplayName: originParentNode,
                  newParentNodeDisplayName: displayName,
                  updateSlices,
                }),
              )
            }
          }
        }

        const mousePosition = cursorPositionRef.current
        sendMousePositionHandler(
          displayName,
          mousePosition.xInteger,
          mousePosition.yInteger,
          mousePosition.xMod,
          mousePosition.yMod,
        )

        return {
          isDropOnCanvas: true,
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
      }),
    }),
    [isEditMode, unitWidth, fixedBounds, scrollContainerScrollTop],
  )

  const autoScrollTimeID = useRef<number>(0)

  setScrollBarContainerController(displayName, scrollContainerRef)

  useEffect(() => {
    return () => {
      removeScrollBarContainerControllerByDisplayName(displayName)
    }
  }, [displayName])

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return
    const autoScroll = (e: MouseEvent) => {
      if (!collectedProps.isOver || !scrollContainer || !isRootCanvas) return
      const { top, bottom } = scrollContainer.getBoundingClientRect()
      const { clientY } = e
      window.clearInterval(autoScrollTimeID.current)
      autoScrollTimeID.current = window.setInterval(() => {
        if (clientY < top + UNIT_HEIGHT * 10) {
          scrollContainer!.scrollBy({
            top: -10,
          })
        }
        if (clientY > bottom - UNIT_HEIGHT * 10) {
          scrollContainer!.scrollBy({
            top: 10,
          })
        }
      }, 180)
    }
    scrollContainer?.addEventListener("mousemove", autoScroll)
    return () => {
      if (scrollContainer) {
        scrollContainer?.removeEventListener("mousemove", autoScroll)
      }
      window.clearInterval(autoScrollTimeID.current)
    }
  }, [collectedProps.isOver, isRootCanvas])

  useEffect(() => {
    if (collectedProps.isOver) return
    const maxHeight = Math.max(
      ...childWidgetLayoutInfo.map(
        (item) => item.layoutInfo.y + item.layoutInfo.h,
      ),
    )

    if (
      maxHeight * UNIT_HEIGHT >
      fixedBounds.height - SAFE_ROWS * UNIT_HEIGHT
    ) {
      if (isEditMode) {
        setCanvasHeight(maxHeight * UNIT_HEIGHT + ADD_ROWS * UNIT_HEIGHT)
      } else {
        setCanvasHeight(maxHeight * UNIT_HEIGHT)
      }
    } else {
      setCanvasHeight(fixedBounds.height)
    }
  }, [
    childWidgetLayoutInfo,
    collectedProps.isOver,
    containerPadding,
    fixedBounds.height,
    isEditMode,
  ])

  useEffect(() => {
    if (firstDragRef.current && isDraggingGlobal) {
      firstDragRef.current = false
      dragStartScrollTop.current = scrollContainerScrollTop
      return
    }
    if (!isDraggingGlobal) {
      firstDragRef.current = true
      dragStartScrollTop.current = scrollContainerScrollTop
    }
  }, [isDraggingGlobal, scrollContainerScrollTop])

  const { cursorPositionRef } = useMousePositionAsync(
    scrollContainerRef,
    unitWidth,
    displayName,
    isRootCanvas,
    scrollContainerRef,
  )

  const handleClickOnCanvas: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (selectedComponents.length > 1) {
        // calc group position
        let leftTopX = Number.MAX_SAFE_INTEGER
        let leftTopY = Number.MAX_SAFE_INTEGER
        let maxRightBottomX = Number.MIN_SAFE_INTEGER
        let maxRightBottomY = Number.MIN_SAFE_INTEGER

        selectedComponents.forEach((nodeName) => {
          const node = searchDSLByDisplayName(nodeName)
          if (node) {
            leftTopX = Math.min(leftTopX, node.x)
            leftTopY = Math.min(leftTopY, node.y)
            maxRightBottomX = Math.max(maxRightBottomX, node.x + node.w)
            maxRightBottomY = Math.max(maxRightBottomY, node.y + node.h)
          }
        })
        FocusManager.switchFocus("canvas", {
          displayName: displayName,
          type: "group",
          // x, y, w, h
          clickPosition: [
            leftTopX,
            leftTopY,
            maxRightBottomX - leftTopX,
            maxRightBottomY - leftTopY,
          ],
          columnNumber,
        })
      } else if (selectedComponents.length === 1) {
        FocusManager.switchFocus("canvas", {
          displayName: selectedComponents[0],
          type: "component",
          clickPosition: [],
          columnNumber,
        })
      } else {
        FocusManager.switchFocus("canvas", {
          displayName: displayName,
          type: "inner_container",
          clickPosition: getMousePointerPosition(
            event.clientX - event.currentTarget.getBoundingClientRect().x,
            event.clientY - event.currentTarget.getBoundingClientRect().y,
            unitWidth,
            UNIT_HEIGHT,
            columnNumber,
          ),
          columnNumber,
        })
      }
    },
    [columnNumber, displayName, selectedComponents, unitWidth],
  )

  return (
    <div
      css={outerComponentCanvasContainerStyle(containerPadding)}
      ref={canvasRef}
    >
      <div css={componentCanvasContainerStyle} ref={scrollContainerRef}>
        <div ref={dropRef} css={dropZoneStyle(canvasHeight)}>
          <div
            css={[
              applyComponentCanvasStyle(unitWidth, canShowDot),
              selectoSelectionStyle,
            ]}
            data-isroot={isRootCanvas}
            onClick={handleClickOnCanvas}
          >
            <DragShadowPreview
              unitW={unitWidth}
              parentDisplayName={displayName}
              columns={columnNumber}
            />
            <MousePreview unitW={unitWidth} displayName={displayName} />
            {currentLayoutInfo?.childrenNode?.map((childName) => {
              return (
                <ComponentParser
                  key={`${displayName}-${childName}}`}
                  displayName={childName}
                  unitW={unitWidth}
                  parentNodeDisplayName={displayName}
                  columnNumber={columnNumber}
                />
              )
            })}
            {collectedProps.isOver && (
              <DragPreview
                containerLeft={fixedBounds.left}
                containerTop={fixedBounds.top}
                containerScrollTop={scrollContainerScrollTop}
                unitW={unitWidth}
                parentNodeDisplayName={displayName}
                columnNumber={columnNumber}
              />
            )}
            {!isLikeProductMode && isRootCanvas && (
              <MultiSelectCanvas
                scrollContainerRef={scrollContainerRef}
                canvasNodeDisplayName={displayName}
              />
            )}
            {!isDraggingGlobal && (
              <MultiSelectedScaleSquare
                unitW={unitWidth}
                containerDisplayName={displayName}
              />
            )}
          </div>
        </div>
      </div>
      {canShowDot && <div css={containerShapeStyle(containerPadding)} />}
    </div>
  )
}
