import {
  FC,
  MouseEventHandler,
  memo,
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
import { getMousePointerPosition } from "@/page/App/components/DotPanel/calc"
import ComponentParser from "@/page/App/components/DotPanel/components/ComponentParser"
import DragPreview from "@/page/App/components/DotPanel/components/DragPreview"
import { DragShadowPreview } from "@/page/App/components/DotPanel/components/DragShadowPreview"
import { MousePreview } from "@/page/App/components/DotPanel/components/MousePreview"
import { MultiSelectCanvas } from "@/page/App/components/DotPanel/components/MultiSelectCanvas"
import MultiSelectedScaleSquare from "@/page/App/components/DotPanel/components/MultiSelectedContainer"
import {
  ADD_ROWS,
  DEFAULT_BODY_COLUMNS_NUMBER,
  SAFE_ROWS,
  SCROLL_CONTAINER_PADDING,
  UNIT_HEIGHT,
} from "@/page/App/components/DotPanel/constant/canvas"
import {
  removeScrollBarContainerControllerByDisplayName,
  setScrollBarContainerController,
} from "@/page/App/components/DotPanel/context/scrollBarContext"
import { useMousePositionAsync } from "@/page/App/components/DotPanel/hooks/useMousePostionAsync"
import { clamWidgetShape } from "@/page/App/components/DotPanel/utils/getDragShadow"
import { getLayoutInfosWithRelativeCombineShape } from "@/page/App/components/DotPanel/utils/getDropResult"
import { sendMousePositionHandler } from "@/page/App/components/DotPanel/utils/sendBinaryMessage"
import {
  DRAG_EFFECT,
  DragInfo,
} from "@/page/App/components/ScaleSquare/components/DragContainer/interface"
import { useResizingUpdateRealTime } from "@/page/App/components/ScaleSquare/components/ResizingAndDragContainer/ResizeHandler/hooks"
import {
  getIsILLAEditMode,
  getIsLikeProductMode,
  getSelectedComponentDisplayNames,
  isShowDot,
} from "@/redux/config/configSelector"
import {
  getContainerListDisplayNameMappedChildrenNodeDisplayName,
  searchDSLByDisplayName,
} from "@/redux/currentApp/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import {
  getCurrentPageDisplayName,
  getIsDragging,
  getIsResizing,
} from "@/redux/currentApp/executionTree/executionSelector"
import { getClientWidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoSelector"
import { FocusManager } from "@/utils/focusManager"
import { newGenerateComponentNode } from "@/utils/generators/generateComponentNode"
import { getPaddingShape } from "@/utils/styleUtils/padding"
import { ContainerEmptyState } from "@/widgetLibrary/ContainerWidget/emptyState"
import { useAutoUpdateCanvasHeight } from "@/widgetLibrary/PublicSector/utils/autoUpdateHeight"
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

const RenderComponentCanvasContainer: FC<
  RenderComponentCanvasContainerProps
> = (props) => {
  const {
    columnNumber = DEFAULT_BODY_COLUMNS_NUMBER,
    isRootCanvas,
    displayName,
    containerPadding,
    canResizeCanvas = false,
    safeRowNumber = SAFE_ROWS,
    minHeight,
    background,
    shadowSize = "none",
    handleUpdateHeight,
  } = props

  const containerListMapChildName = useSelector(
    getContainerListDisplayNameMappedChildrenNodeDisplayName,
  )

  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const firstDragRef = useRef(true)
  const dragStartScrollTop = useRef(0)
  const { y: scrollContainerScrollTop } = useScroll(scrollContainerRef)
  const currentPageDisplayName = useSelector(getCurrentPageDisplayName)
  const [canvasRef, bounds] = useMeasure()
  const messageHandler = useMessage()
  const innerCanvasRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation()
  const paddings = getPaddingShape(containerPadding)
  const fixedBounds = {
    top: bounds.top + paddings.paddingTop + SCROLL_CONTAINER_PADDING,
    left: bounds.left + paddings.paddingLeft + SCROLL_CONTAINER_PADDING,
    width:
      bounds.width -
      (paddings.paddingLeft +
        paddings.paddingRight +
        SCROLL_CONTAINER_PADDING * 2),
    height:
      bounds.height -
      (paddings.paddingTop +
        paddings.paddingBottom +
        SCROLL_CONTAINER_PADDING * 2),
  }

  const canShowDot = useSelector(isShowDot)
  const unitWidth = fixedBounds.width / columnNumber

  const [canvasHeight, setCanvasHeight] = useState<number>(fixedBounds.height)
  const widgetLayoutInfo = useSelector(getClientWidgetLayoutInfo)
  const childWidgetLayoutInfo = Object.values(widgetLayoutInfo).filter(
    (item) => item.parentNode === displayName,
  )
  const selectedComponents = useSelector(getSelectedComponentDisplayNames)
  const dispatch = useDispatch()
  const isDraggingGlobal = useSelector(getIsDragging)
  const isResizingGlobal = useSelector(getIsResizing)
  const isLikeProductMode = useSelector(getIsLikeProductMode)

  const isEditMode = useSelector(getIsILLAEditMode)

  const currentLayoutInfo = widgetLayoutInfo[displayName]

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

        const hasTable = draggedComponents.some(
          (components) => components.widgetType === "TABLE_WIDGET",
        )
        const isListChildrenCanvas = Object.values(
          containerListMapChildName,
        ).some((childDisplayNames) => childDisplayNames.includes(displayName))

        if (hasTable && isListChildrenCanvas) {
          messageHandler.error({
            content: t("editor.inspect.setter_tips.list.table_disallowed"),
          })
          return {
            isDropOnCanvas: false,
          }
        }

        const {
          shape: dropResultShape,
          columnNumberWhenDrag,
          columnNumberWhenDrop,
        } = dropResult

        if (draggedComponents.length === 1) {
          switch (dragEffect) {
            case DRAG_EFFECT.ADD: {
              const newComponentNode = newGenerateComponentNode(
                dropResultShape.x,
                dropResultShape.y,
                dropResultShape.w,
                draggedComponents[0].widgetType,
                draggedComponents[0].displayName,
                displayName,
                [],
                columnNumberWhenDrop / columnNumberWhenDrag,
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
                componentsActions.updateComponentPositionReducer({
                  oldParentNodeDisplayName: originParentNode,
                  newParentNodeDisplayName: displayName,
                  updateSlices,
                  columnNumberWhenDrag,
                  columnNumberWhenDrop,
                }),
              )
            }
          }
        }

        if (draggedComponents.length > 1 && dragEffect === DRAG_EFFECT.UPDATE) {
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
            componentsActions.updateComponentPositionReducer({
              oldParentNodeDisplayName: originParentNode,
              newParentNodeDisplayName: displayName,
              updateSlices,
              columnNumberWhenDrag,
              columnNumberWhenDrop,
            }),
          )
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
      collect: (monitor) => {
        return {
          isOver: monitor.isOver({ shallow: true }),
        }
      },
    }),
    [
      isEditMode,
      unitWidth,
      fixedBounds,
      scrollContainerScrollTop,
      displayName,
      containerListMapChildName,
    ],
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
      if (
        (!collectedProps.isOver &&
          scrollContainer.dataset.isDraggingOver !== "true") ||
        !scrollContainer ||
        !isRootCanvas
      ) {
        return
      }
      const { top, bottom } = scrollContainer.getBoundingClientRect()
      const { clientY } = e
      window.clearInterval(autoScrollTimeID.current)
      autoScrollTimeID.current = window.setInterval(() => {
        if (clientY < top + UNIT_HEIGHT * safeRowNumber) {
          scrollContainer!.scrollBy({
            top: -8,
          })
        }
        if (clientY > bottom - UNIT_HEIGHT * safeRowNumber) {
          scrollContainer!.scrollBy({
            top: 8,
          })
        }
      }, 160)
    }
    scrollContainer?.addEventListener("mousemove", autoScroll)
    return () => {
      if (scrollContainer) {
        scrollContainer?.removeEventListener("mousemove", autoScroll)
      }
      window.clearInterval(autoScrollTimeID.current)
    }
  }, [collectedProps.isOver, isResizingGlobal, isRootCanvas, safeRowNumber])

  const isDraggingOver =
    scrollContainerRef.current?.dataset.isDraggingOver === "true"

  const prevMaxHeight = useRef<number>(0)
  const maxHeight = Math.max(
    ...childWidgetLayoutInfo.map(
      (item) => item.layoutInfo.y + item.layoutInfo.h,
    ),
  )
  useEffect(() => {
    if (
      isDraggingOver &&
      isFinite(maxHeight) &&
      maxHeight > prevMaxHeight.current
    ) {
      prevMaxHeight.current = maxHeight
    }

    if (!isDraggingOver) {
      prevMaxHeight.current = maxHeight
    }
  }, [isDraggingOver, maxHeight])

  useEffect(() => {
    const innerCanvasDOM = innerCanvasRef.current
    if (!innerCanvasDOM) return
    const innerCanvasDOMRect = innerCanvasDOM.getBoundingClientRect()

    if (
      isFinite(maxHeight) &&
      prevMaxHeight.current > maxHeight &&
      isResizingGlobal
    ) {
      return
    }

    if (canResizeCanvas) {
      if (isFinite(maxHeight)) {
        setCanvasHeight(maxHeight * UNIT_HEIGHT)
      } else {
        setCanvasHeight(minHeight as number)
      }
      return
    }

    if (maxHeight * UNIT_HEIGHT < fixedBounds.height) {
      setCanvasHeight(fixedBounds.height)
      return
    }

    if (
      maxHeight * UNIT_HEIGHT >=
      innerCanvasDOMRect.height - UNIT_HEIGHT * ADD_ROWS
    ) {
      if (isEditMode && isRootCanvas) {
        setCanvasHeight(maxHeight * UNIT_HEIGHT + UNIT_HEIGHT * ADD_ROWS)
      } else {
        setCanvasHeight(maxHeight * UNIT_HEIGHT)
      }
      return
    }

    setCanvasHeight(maxHeight * UNIT_HEIGHT)
  }, [
    canResizeCanvas,
    fixedBounds.height,
    isEditMode,
    isResizingGlobal,
    isRootCanvas,
    maxHeight,
    minHeight,
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

  const canvasUpdateHeightHandler = useCallback(
    (height: number) => {
      if (!handleUpdateHeight) return
      handleUpdateHeight(
        height +
          SCROLL_CONTAINER_PADDING * 2 +
          paddings.paddingTop +
          paddings.paddingBottom,
      )
    },
    [handleUpdateHeight, paddings.paddingBottom, paddings.paddingTop],
  )

  useAutoUpdateCanvasHeight(
    canvasUpdateHeightHandler,
    innerCanvasRef.current,
    canResizeCanvas,
  )

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
        })
      }
    },
    [columnNumber, displayName, selectedComponents, unitWidth],
  )

  useResizingUpdateRealTime(isDraggingOver)

  return (
    <div
      css={outerComponentCanvasContainerStyle(
        containerPadding,
        background,
        shadowSize,
      )}
      data-outer-canvas-container={displayName}
      ref={canvasRef}
    >
      <div
        css={componentCanvasContainerStyle}
        ref={scrollContainerRef}
        data-scroll-container={displayName}
        data-column-number={columnNumber}
        data-unit-width={unitWidth}
        data-is-dragging-over={false}
        className="scroll-container"
      >
        <div
          ref={(node) => {
            dropRef(node)
            innerCanvasRef.current = node
          }}
          css={dropZoneStyle(canvasHeight)}
          onClick={handleClickOnCanvas}
        >
          <div
            css={[
              applyComponentCanvasStyle(unitWidth, canShowDot),
              selectoSelectionStyle,
            ]}
            onClick={handleClickOnCanvas}
            data-isroot={isRootCanvas}
            data-canvas-container={displayName}
            data-column-number={columnNumber}
            data-unit-width={unitWidth}
            data-list-widget-container
          >
            {isEditMode && (
              <DragShadowPreview
                unitW={unitWidth}
                parentDisplayName={displayName}
                columns={columnNumber}
              />
            )}
            {isEditMode && (
              <MousePreview unitW={unitWidth} displayName={displayName} />
            )}
            {currentLayoutInfo?.childrenNode?.length > 0 ? (
              currentLayoutInfo?.childrenNode?.map((childName) => {
                return (
                  <ComponentParser
                    key={`${displayName}-${childName}`}
                    displayName={childName}
                    unitW={unitWidth}
                    parentNodeDisplayName={displayName}
                    columnNumber={columnNumber}
                  />
                )
              })
            ) : isRootCanvas ? null : (
              <ContainerEmptyState
                isInner
                containerPadding={containerPadding}
              />
            )}
            {collectedProps.isOver && isEditMode && (
              <DragPreview
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
            {!isDraggingGlobal && !isLikeProductMode && (
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

RenderComponentCanvasContainer.displayName = "RenderComponentCanvasContainer"
export default memo(RenderComponentCanvasContainer)
