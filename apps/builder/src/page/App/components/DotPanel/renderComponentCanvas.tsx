import { AnimatePresence } from "framer-motion"
import { cloneDeep, throttle } from "lodash"
import {
  FC,
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { DropTargetMonitor, useDragDropManager, useDrop } from "react-dnd"
import { useDispatch, useSelector } from "react-redux"
import useMeasure from "react-use-measure"
import {
  MoveDragResult,
  getDragResult,
  isAddAction,
} from "@/page/App/components/DotPanel/calc"
import { DragPreview } from "@/page/App/components/DotPanel/dragPreview"
import { FreezePlaceholder } from "@/page/App/components/DotPanel/freezePlaceholder"
import { useMousePositionAsync } from "@/page/App/components/DotPanel/hooks/useMousePostionAsync"
import {
  DragInfo,
  DropCollectedInfo,
  DropResultInfo,
} from "@/page/App/components/DotPanel/interface"
import { MultiSelectCanvas } from "@/page/App/components/DotPanel/multiSelectCanvas"
import { PreviewColumnsChange } from "@/page/App/components/DotPanel/previewColumnsChange"
import {
  applyComponentCanvasStyle,
  borderLineStyle,
  selectoSelectionStyle,
} from "@/page/App/components/DotPanel/style"
import {
  getLargeItemSharpe,
  getScaleItem,
  getScaleResult,
  moveCallback,
} from "@/page/App/components/DotPanel/utils"
import { ScaleSquare } from "@/page/App/components/ScaleSquare"
import { MultiSelectedScaleSquare } from "@/page/App/components/ScaleSquare/multiSelectedScaleSquare"
import {
  getFreezeState,
  getIsILLAEditMode,
  isShowDot,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  modifyComponentNodeX,
  modifyComponentNodeY,
} from "@/redux/currentApp/editor/components/componentsListener"
import { UpdateComponentNodeLayoutInfoPayload } from "@/redux/currentApp/editor/components/componentsPayload"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import {
  IGNORE_WIDGET_TYPES,
  getExecutionWidgetLayoutInfo,
  getRootNodeExecutionResult,
} from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { batchMergeLayoutInfoToComponent } from "@/utils/drag/drag"
import { ILLAEventbus, PAGE_EDITOR_EVENT_PREFIX } from "@/utils/eventBus"
import { BASIC_BLOCK_COLUMNS } from "@/utils/generators/generatePageOrSectionConfig"
import { BasicContainer } from "@/widgetLibrary/BasicContainer/BasicContainer"
import { ContainerEmptyState } from "@/widgetLibrary/ContainerWidget/emptyState"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { DragShadowPreview } from "../DragShadowPreview"
import { MousePreview } from "../MousePreview"
import { sendShadowMessageHandler } from "./utils/sendBinaryMessage"

export const UNIT_HEIGHT = 8

function buildDisplayNameMapComponentNode(
  componentNode: ComponentNode,
  displayNameMap: Record<string, ComponentNode>,
) {
  if (componentNode.displayName) {
    displayNameMap[componentNode.displayName] = componentNode
  }
  if (Array.isArray(componentNode.childrenNode)) {
    componentNode.childrenNode.forEach((childNode) => {
      buildDisplayNameMapComponentNode(childNode, displayNameMap)
    })
  }
}

function applyEffectMapToComponentNode(
  componentNode: ComponentNode,
  effectMap: Map<string, ComponentNode>,
) {
  let newComponentNode = cloneDeep(componentNode)
  if (effectMap.has(newComponentNode.displayName)) {
    newComponentNode = effectMap.get(
      newComponentNode.displayName,
    ) as ComponentNode
  }
  if (Array.isArray(newComponentNode.childrenNode)) {
    newComponentNode.childrenNode = newComponentNode.childrenNode.map(
      (childNode) => {
        return applyEffectMapToComponentNode(childNode, effectMap)
      },
    )
  }
  return newComponentNode
}

function getChildrenNodeUpdateSlice(
  componentNode: ComponentNode,
  childrenUpdateSlice: UpdateComponentNodeLayoutInfoPayload[],
) {
  const childrenNode = componentNode.childrenNode
  if (Array.isArray(childrenNode) && childrenNode.length > 0) {
    childrenNode.forEach((childNode) => {
      childrenUpdateSlice.push({
        displayName: childNode.displayName,
        layoutInfo: {
          x: childNode.x,
          y: childNode.y,
          w: childNode.w,
          h: childNode.h,
        },
        options: {
          parentNode: childNode.parentNode!,
        },
      })
      getChildrenNodeUpdateSlice(childNode, childrenUpdateSlice)
    })
  }
}

function modifyChildrenNodeXWhenDrop(
  componentNode: ComponentNode,
  currentColumns: number,
  oldColumns: number,
  modifyXResult: Record<string, ComponentNode[]>,
) {
  let newComponentNode = cloneDeep(componentNode)
  if (!IGNORE_WIDGET_TYPES.has(componentNode.type)) {
    newComponentNode = modifyComponentNodeX(
      newComponentNode,
      oldColumns,
      currentColumns,
    )
    if (
      newComponentNode.parentNode &&
      !modifyXResult[newComponentNode.parentNode]
    ) {
      modifyXResult[newComponentNode.parentNode] = []
    }
    if (newComponentNode.parentNode) {
      modifyXResult[newComponentNode.parentNode].push(newComponentNode)
    }
  }

  if (
    Array.isArray(newComponentNode.childrenNode) &&
    newComponentNode.childrenNode.length > 0
  ) {
    newComponentNode.childrenNode = newComponentNode.childrenNode.map(
      (childNode) => {
        return modifyChildrenNodeXWhenDrop(
          childNode,
          oldColumns,
          currentColumns,
          modifyXResult,
        )
      },
    )
  }
  return newComponentNode
}

export const RenderComponentCanvas: FC<{
  componentNode: ComponentNode
  containerRef: RefObject<HTMLDivElement>
  containerPadding: number
  minHeight?: number
  canResizeY?: boolean
  safeRowNumber: number
  blockColumns?: number
  addedRowNumber: number
  canAutoScroll?: boolean
  sectionName?: string
}> = (props) => {
  const {
    componentNode,
    containerRef,
    containerPadding,
    minHeight,
    canResizeY = true,
    safeRowNumber,
    blockColumns = BASIC_BLOCK_COLUMNS,
    addedRowNumber,
    canAutoScroll = false,
    sectionName,
  } = props

  const autoScrollTimeID = useRef<number>()

  const isShowCanvasDot = useSelector(isShowDot)
  const isEditMode = useSelector(getIsILLAEditMode)
  const isFreezeCanvas = useSelector(getFreezeState)
  const dispatch = useDispatch()

  const rootNodeProps = useSelector(getRootNodeExecutionResult)
  const widgetExecutionLayoutInfo = useSelector(getExecutionWidgetLayoutInfo)
  const { currentPageIndex, pageSortedKey } = rootNodeProps
  const currentPageDisplayName = pageSortedKey[currentPageIndex]
  const currentDragStartScrollTop = useRef(0)

  const [rowNumber, setRowNumber] = useState(0)
  const [collisionEffect, setCollisionEffect] = useState(
    new Map<string, ComponentNode>(),
  )
  const dragDropManager = useDragDropManager()
  const dragInfo = dragDropManager.getMonitor().getItem() as DragInfo

  const [ShowColumnsChange, setShowColumnsChange] = useState(false)
  const canShowColumnsTimeoutChange = useRef<number | null>(null)
  const canSetCurrentScrollTop = useRef(true)

  const showColumnsPreview = useCallback(() => {
    dispatch(configActions.updateShowDot(true))
    setShowColumnsChange(true)
  }, [dispatch])
  const hideColumnsPreview = useCallback(() => {
    dispatch(configActions.updateShowDot(false))
    setShowColumnsChange(false)
  }, [dispatch])

  const showColumnsChangePreview = useCallback(() => {
    if (canShowColumnsTimeoutChange.current) {
      clearTimeout(canShowColumnsTimeoutChange.current)
    }
    canShowColumnsTimeoutChange.current = window.setTimeout(() => {
      setShowColumnsChange(false)
      dispatch(configActions.updateShowDot(false))
      if (canShowColumnsTimeoutChange.current) {
        clearTimeout(canShowColumnsTimeoutChange.current)
      }
    }, 2000)
  }, [dispatch])

  useEffect(() => {
    if (sectionName) {
      ILLAEventbus.on(
        `${PAGE_EDITOR_EVENT_PREFIX}/SHOW_COLUMNS_PREVIEW_${sectionName}`,
        showColumnsPreview,
      )
      ILLAEventbus.on(
        `${PAGE_EDITOR_EVENT_PREFIX}/HIDE_COLUMNS_PREVIEW_${sectionName}`,
        hideColumnsPreview,
      )
      ILLAEventbus.on(
        `${PAGE_EDITOR_EVENT_PREFIX}/SHOW_COLUMNS_CHANGE_PREVIEW_${sectionName}`,
        showColumnsChangePreview,
      )
    }

    return () => {
      if (sectionName) {
        ILLAEventbus.off(
          `${PAGE_EDITOR_EVENT_PREFIX}/SHOW_COLUMNS_PREVIEW_${sectionName}`,
          showColumnsPreview,
        )
        ILLAEventbus.off(
          `${PAGE_EDITOR_EVENT_PREFIX}/HIDE_COLUMNS_PREVIEW_${sectionName}`,
          hideColumnsPreview,
        )
        ILLAEventbus.off(
          `${PAGE_EDITOR_EVENT_PREFIX}/SHOW_COLUMNS_CHANGE_PREVIEW_${sectionName}`,
          showColumnsChangePreview,
        )
      }
    }
  }, [
    blockColumns,
    dispatch,
    hideColumnsPreview,
    sectionName,
    showColumnsChangePreview,
    showColumnsPreview,
  ])

  const [canvasRef, bounds] = useMeasure()
  const currentCanvasRef = useRef<HTMLDivElement | null>(
    null,
  ) as MutableRefObject<HTMLDivElement | null>
  const canvasBoundingClientRect =
    currentCanvasRef.current?.getBoundingClientRect()

  const unitWidth = useMemo(() => {
    return bounds.width / blockColumns
  }, [blockColumns, bounds.width])

  const { wrapperRef } = useMousePositionAsync(
    containerRef,
    unitWidth,
    componentNode.displayName,
    !!sectionName,
  )

  const throttleUpdateComponentPositionByReflow = useMemo(() => {
    return throttle((updateSlice: UpdateComponentNodeLayoutInfoPayload[]) => {
      dispatch(executionActions.batchUpdateWidgetLayoutInfoReducer(updateSlice))
    }, 60)
  }, [dispatch])

  const moveEffect = useCallback(
    (
      dragResult: MoveDragResult,
      reflowUpdateSlice: UpdateComponentNodeLayoutInfoPayload[] | undefined,
      newEffectResultMap: Map<string, ComponentNode>,
      itemHeight: number,
    ) => {
      const { ladingPosition } = dragResult
      const { landingY } = ladingPosition
      const currentRowHeight = landingY / UNIT_HEIGHT
      setRowNumber((prevState) => {
        if (
          canResizeY &&
          currentRowHeight + itemHeight > prevState - safeRowNumber
        ) {
          return landingY / UNIT_HEIGHT + itemHeight + safeRowNumber
        } else {
          return prevState
        }
      })
      if (!isFreezeCanvas) {
        setCollisionEffect(new Map())
      } else {
        setCollisionEffect(newEffectResultMap)
      }
      if (reflowUpdateSlice) {
        throttleUpdateComponentPositionByReflow(reflowUpdateSlice)
      }
    },
    [
      canResizeY,
      isFreezeCanvas,
      safeRowNumber,
      throttleUpdateComponentPositionByReflow,
    ],
  )

  const [{ isActive }, dropTarget] = useDrop<
    DragInfo,
    DropResultInfo,
    DropCollectedInfo
  >(
    () => ({
      accept: ["components"],
      canDrop: () => {
        return isEditMode
      },
      hover: (dragInfo, monitor) => {
        if (!monitor.isOver({ shallow: true })) {
          setCollisionEffect(new Map())
        }
        if (monitor.isOver({ shallow: true }) && monitor.getClientOffset()) {
          const {
            reflowUpdateSlice,
            newEffectResultMap,
            scaleItem,
            dragResult,
          } = moveCallback(
            dragInfo,
            blockColumns,
            componentNode.displayName,
            monitor,
            containerRef,
            unitWidth,
            canvasBoundingClientRect!,
            canResizeY,
            containerPadding,
            isFreezeCanvas,
            currentDragStartScrollTop.current,
          )
          const { draggedSelectedComponents } = dragInfo
          const displayNames = draggedSelectedComponents.map(
            (node) => node.displayName,
          )
          const { ladingRelativePosition } = dragResult
          sendShadowMessageHandler(
            2,
            componentNode.displayName,
            displayNames,
            ladingRelativePosition.x,
            ladingRelativePosition.y,
            scaleItem.w,
            scaleItem.h,
          )
          moveEffect(
            dragResult,
            reflowUpdateSlice,
            newEffectResultMap,
            scaleItem.h,
          )
        }
      },
      drop: (dragInfo, monitor) => {
        const isDrop = monitor.didDrop()
        const dropResult = monitor.getDropResult()
        const { item, currentColumnNumber, draggedSelectedComponents } =
          dragInfo
        if (
          (isDrop || item.displayName === componentNode.displayName) &&
          dropResult
        ) {
          canSetCurrentScrollTop.current = true
          return {
            isDropOnCanvas: dropResult.isDropOnCanvas,
          }
        }

        if (monitor.getClientOffset()) {
          let scaleItem: ComponentNode = getScaleItem(
            blockColumns,
            currentColumnNumber,
            item,
          )

          const actionName = isAddAction(
            item.x,
            item.y,
            item.parentNode,
            componentNode.displayName,
          )
            ? "ADD"
            : "UPDATE"

          if (actionName === "ADD") {
            const displayNameMapComponent: Record<string, ComponentNode> = {}
            buildDisplayNameMapComponentNode(scaleItem, displayNameMapComponent)
            if (
              Array.isArray(scaleItem.childrenNode) &&
              scaleItem.childrenNode.length > 0
            ) {
              const modifyXChildrenNode: Record<string, ComponentNode[]> = {}
              scaleItem.childrenNode = scaleItem.childrenNode.map((child) => {
                return modifyChildrenNodeXWhenDrop(
                  child,
                  currentColumnNumber,
                  blockColumns,
                  modifyXChildrenNode,
                )
              })

              Object.keys(modifyXChildrenNode).forEach((key) => {
                const componentNodes = modifyXChildrenNode[key]
                const parentNode = displayNameMapComponent[key]
                if (parentNode) {
                  const map = modifyComponentNodeY(componentNodes, parentNode)
                  map.forEach((value, key) => {
                    displayNameMapComponent[key] = value
                  })
                  scaleItem = applyEffectMapToComponentNode(scaleItem, map)
                }
              })
            }
          }

          const scaleItemsShape = getLargeItemSharpe(
            draggedSelectedComponents,
            blockColumns,
            currentColumnNumber,
          )
          scaleItem = {
            ...scaleItem,
            ...scaleItemsShape,
            displayName: "largeItem",
            type: "LARGE_ITEM",
          }

          const containerClientRect =
            containerRef.current?.getBoundingClientRect()
          const containerPosition = {
            x: containerClientRect?.x || 0,
            y: containerClientRect?.y || 0,
          }
          const scrollTop = containerRef.current?.scrollTop
          const clientOffset = monitor.getClientOffset()
          const initialClientOffset = monitor.getInitialClientOffset()
          const initialSourceClientOffSet =
            monitor.getInitialSourceClientOffset()

          const dragResult = getDragResult(
            actionName,
            clientOffset!,
            initialClientOffset!,
            initialSourceClientOffSet!,
            containerPosition,
            scrollTop,
            unitWidth,
            scaleItem,
            bounds.width,
            bounds.height,
            canResizeY,
            containerPadding,
            containerPadding,
            {
              x:
                scaleItem.x * unitWidth +
                containerPadding +
                containerPosition!.x,
              y:
                scaleItem.y * UNIT_HEIGHT +
                containerPadding +
                containerPosition!.y -
                currentDragStartScrollTop.current,
            },
          )
          const { ladingPosition } = dragResult
          const { landingX, landingY } = ladingPosition

          /**
           * generate component node with new position
           */
          const oldParentNodeDisplayName = item.parentNode || "root"
          const newItem = {
            ...scaleItem,
            parentNode: componentNode.displayName || "root",
            x: Math.round(landingX / unitWidth),
            y: Math.round(landingY / UNIT_HEIGHT),
            unitW: unitWidth,
            unitH: UNIT_HEIGHT,
            isDragging: false,
          }

          const relativePositionWithComponentNode =
            draggedSelectedComponents.map((node) => {
              const scaleNode = getScaleItem(
                blockColumns,
                currentColumnNumber,
                node,
              )
              const relativeX = scaleNode.x - scaleItemsShape.x
              const scaleX = getScaleResult(
                relativeX,
                blockColumns,
                currentColumnNumber,
              )
              return {
                ...scaleNode,
                x: scaleX,
                y: scaleNode.y - scaleItemsShape.y,
                unitW: unitWidth,
                unitH: UNIT_HEIGHT,
                parentNode: componentNode.displayName || "root",
              }
            })

          const realPositionWithComponentNode =
            relativePositionWithComponentNode.map((node) => {
              return {
                ...node,
                x: node.x + newItem.x,
                y: node.y + newItem.y,
              }
            })
          /**
           * add new nodes
           */
          if (item.x === -1 && item.y === -1) {
            if (item.type === "MODAL_WIDGET") {
              dispatch(
                componentsActions.addModalComponentReducer({
                  currentPageDisplayName,
                  modalComponentNode: realPositionWithComponentNode[0],
                }),
              )
            } else {
              dispatch(
                componentsActions.addComponentReducer(
                  realPositionWithComponentNode,
                ),
              )
            }
          } else {
            /**
             * update node when change container
             */
            const updateSlice = realPositionWithComponentNode.map((node) => {
              return {
                displayName: node.displayName,
                layoutInfo: {
                  x: node.x,
                  y: node.y,
                  w: node.w,
                  h: node.h,
                },
                options: {
                  parentNode: newItem.parentNode,
                },
              }
            })
            const childrenUpdateSlice: UpdateComponentNodeLayoutInfoPayload[] =
              []
            if (oldParentNodeDisplayName !== componentNode.displayName) {
              const updateContainerSlice = realPositionWithComponentNode.map(
                (node) => {
                  return {
                    component: node,
                    oldParentDisplayName: oldParentNodeDisplayName,
                  }
                },
              )
              getChildrenNodeUpdateSlice(newItem, childrenUpdateSlice)
              dispatch(
                componentsActions.updateComponentContainerReducer({
                  isMove: false,
                  updateSlice: updateContainerSlice,
                }),
              )
            }
            dispatch(
              componentsActions.batchUpdateComponentLayoutInfoReducer([
                ...updateSlice,
                ...childrenUpdateSlice,
              ]),
            )

            dispatch(
              componentsActions.updateComponentStatusInfoReducer({
                displayName: newItem.displayName,
                statusInfo: {
                  isDragging: false,
                },
              }),
            )
          }
          setCollisionEffect(new Map())
          canSetCurrentScrollTop.current = true
          return {
            isDropOnCanvas: true,
          }
        }
        canSetCurrentScrollTop.current = true
        return {
          isDropOnCanvas: false,
        }
      },
      collect: (monitor) => {
        const dragInfo = monitor.getItem()
        if (!dragInfo) {
          return {
            isActive: monitor.canDrop() && monitor.isOver({ shallow: true }),
          }
        }

        return {
          isActive: monitor.canDrop() && monitor.isOver({ shallow: true }),
        }
      },
    }),
    [
      bounds,
      unitWidth,
      UNIT_HEIGHT,
      isFreezeCanvas,
      componentNode,
      currentPageDisplayName,
    ],
  )

  const componentTree = useMemo(() => {
    const componentNodes = batchMergeLayoutInfoToComponent(
      widgetExecutionLayoutInfo,
      componentNode.childrenNode ?? [],
    )
    return componentNodes
      .sort((a, b) => (a.y > b.y ? 1 : -1))
      .map((item) => {
        const containerHeight =
          componentNode.displayName === "root"
            ? rowNumber * UNIT_HEIGHT
            : (componentNode.h - 1) * UNIT_HEIGHT
        switch (item.containerType) {
          case "EDITOR_DOT_PANEL":
            return (
              <BasicContainer
                componentNode={item}
                key={item.displayName}
                canResizeY={canResizeY}
                minHeight={minHeight}
                safeRowNumber={safeRowNumber}
                addedRowNumber={addedRowNumber}
                blockColumns={blockColumns}
              />
            )
          case "EDITOR_SCALE_SQUARE":
            const widget = widgetBuilder(item.type)
            if (!widget) return null
            return (
              <ScaleSquare
                key={item.displayName}
                componentNode={item}
                unitW={unitWidth}
                unitH={UNIT_HEIGHT}
                containerHeight={containerHeight}
                containerPadding={containerPadding}
                childrenNode={componentNode.childrenNode}
                collisionEffect={collisionEffect}
                blockColumns={blockColumns}
              />
            )
          default:
            return null
        }
      })
  }, [
    addedRowNumber,
    blockColumns,
    canResizeY,
    collisionEffect,
    componentNode.childrenNode,
    componentNode.displayName,
    componentNode.h,
    containerPadding,
    minHeight,
    rowNumber,
    safeRowNumber,
    unitWidth,
    widgetExecutionLayoutInfo,
  ])

  const maxY = useMemo(() => {
    let maxY = 0
    const componentNodes = batchMergeLayoutInfoToComponent(
      widgetExecutionLayoutInfo,
      componentNode.childrenNode ?? [],
    )
    componentNodes.forEach((node) => {
      maxY = Math.max(maxY, node.y + node.h)
    })
    return maxY
  }, [componentNode.childrenNode, widgetExecutionLayoutInfo])

  const finalRowNumber = useMemo(() => {
    return Math.max(
      maxY,
      Math.floor((minHeight || bounds.height) / UNIT_HEIGHT),
    )
  }, [bounds.height, maxY, minHeight])

  useLayoutEffect(() => {
    if (!isActive && canResizeY) {
      if (isEditMode) {
        if (
          finalRowNumber === maxY &&
          finalRowNumber + addedRowNumber >= rowNumber
        ) {
          setRowNumber(finalRowNumber + addedRowNumber)
        } else {
          setRowNumber(finalRowNumber)
        }
      } else {
        setRowNumber(maxY)
      }
    }
  }, [
    addedRowNumber,
    canAutoScroll,
    canResizeY,
    containerRef,
    finalRowNumber,
    isActive,
    isEditMode,
    maxY,
    rowNumber,
  ])

  const throttleScrollEffect = useMemo(() => {
    return throttle(
      (
        dragInfo: DragInfo,
        monitor: DropTargetMonitor<DragInfo, DropResultInfo>,
      ) => {
        const { dragResult, reflowUpdateSlice, newEffectResultMap, scaleItem } =
          moveCallback(
            dragInfo,
            blockColumns,
            componentNode.displayName,
            monitor,
            containerRef,
            unitWidth,
            canvasBoundingClientRect!,
            canResizeY,
            containerPadding,
            isFreezeCanvas,
            currentDragStartScrollTop.current,
          )
        moveEffect(
          dragResult,
          reflowUpdateSlice,
          newEffectResultMap,
          scaleItem.h,
        )
      },
      1,
    )
  }, [
    blockColumns,
    canResizeY,
    canvasBoundingClientRect,
    componentNode.displayName,
    containerPadding,
    containerRef,
    isFreezeCanvas,
    moveEffect,
    unitWidth,
  ])

  useEffect(() => {
    if (!isActive) {
      setCollisionEffect(new Map())
    }
  }, [isActive])

  useEffect(() => {
    if (isActive && canSetCurrentScrollTop.current) {
      currentDragStartScrollTop.current = containerRef.current?.scrollTop ?? 0
      canSetCurrentScrollTop.current = false
    }

    return () => {
      if (canSetCurrentScrollTop.current) {
        currentDragStartScrollTop.current = 0
      }
    }
  }, [containerRef, dragDropManager, isActive])

  useEffect(() => {
    if (!containerRef.current) return

    const monitor = dragDropManager.getMonitor() as any

    const scrollHandler = () => {
      if (dragInfo && monitor) {
        throttleScrollEffect(dragInfo, monitor)
      }
    }
    containerRef.current.addEventListener("scroll", scrollHandler)

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      containerRef.current?.removeEventListener("scroll", scrollHandler)
    }
  }, [containerRef, dragDropManager, dragInfo, throttleScrollEffect])

  useEffect(() => {
    if (!currentCanvasRef.current) return
    const autoScroll = (e: MouseEvent) => {
      if (!isActive || !containerRef.current) return
      const { top, bottom } = containerRef.current.getBoundingClientRect()
      const { clientY } = e

      window.clearInterval(autoScrollTimeID.current)
      autoScrollTimeID.current = window.setInterval(() => {
        if (clientY < top + 50) {
          containerRef.current!.scrollBy({
            top: -10,
          })
        }
        if (clientY > bottom - 50) {
          containerRef.current!.scrollBy({
            top: 10,
          })
        }
      }, 1)
    }

    currentCanvasRef.current?.addEventListener("mousemove", autoScroll)

    return () => {
      if (currentCanvasRef.current) {
        currentCanvasRef.current?.removeEventListener("mousemove", autoScroll)
      }
      window.clearInterval(autoScrollTimeID.current)
    }
  }, [containerRef, isActive])

  if (
    isEditMode &&
    componentNode.type === "CANVAS" &&
    (!Array.isArray(componentNode.childrenNode) ||
      componentNode.childrenNode.length === 0) &&
    !isShowCanvasDot
  ) {
    return <ContainerEmptyState minHeight={minHeight} />
  }

  return (
    <div
      ref={(node) => {
        currentCanvasRef.current = node
        wrapperRef.current = node
        dropTarget(node)
        canvasRef(node)
      }}
      data-isroot={!!sectionName}
      id="realCanvas"
      className="illa-canvas"
      css={[
        applyComponentCanvasStyle(
          bounds.width,
          bounds.height,
          bounds.width / blockColumns,
          UNIT_HEIGHT,
          isShowCanvasDot,
          rowNumber * 8,
          minHeight,
        ),
        selectoSelectionStyle,
      ]}
    >
      <DragShadowPreview
        unitW={unitWidth}
        parentDisplayName={componentNode.displayName}
      />
      <MousePreview unitW={unitWidth} displayName={componentNode.displayName} />
      {componentTree}
      {isActive && dragInfo && (
        <DragPreview
          containerRef={containerRef}
          canResizeY={canResizeY}
          unitWidth={unitWidth}
          canvasHeight={bounds.height}
          canvasWidth={bounds.width}
          containerLeftPadding={containerPadding}
          containerTopPadding={containerPadding}
          columnNumber={blockColumns}
          containerWidgetDisplayName={componentNode.displayName}
          currentDragStartScrollTop={currentDragStartScrollTop.current}
        />
      )}
      <MultiSelectCanvas
        currentCanvasRef={currentCanvasRef}
        containerRef={containerRef}
        canvasNodeDisplayName={componentNode.displayName}
      />
      {!dragDropManager.getMonitor().isDragging() && (
        <MultiSelectedScaleSquare
          unitW={unitWidth}
          containerDisplayName={componentNode.displayName}
        />
      )}
      {isShowCanvasDot && <div css={borderLineStyle} />}
      {isActive && (
        <FreezePlaceholder
          effectMap={collisionEffect}
          unitW={unitWidth}
          unitH={UNIT_HEIGHT}
        />
      )}
      <AnimatePresence>
        {componentNode.type === "CONTAINER_NODE" && ShowColumnsChange && (
          <PreviewColumnsChange unitWidth={unitWidth} columns={blockColumns} />
        )}
      </AnimatePresence>
    </div>
  )
}
