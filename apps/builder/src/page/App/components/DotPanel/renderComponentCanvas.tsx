import {
  FC,
  MutableRefObject,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getFreezeState,
  getIllaMode,
  isShowDot,
} from "@/redux/config/configSelector"
import { ScaleSquare } from "@/page/App/components/ScaleSquare"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import {
  applyComponentCanvasStyle,
  borderLineStyle,
} from "@/page/App/components/DotPanel/style"
import useMeasure from "react-use-measure"
import { configActions } from "@/redux/config/configSlice"
import {
  DebounceUpdateReflow,
  DragInfo,
  DropCollectedInfo,
  DropResultInfo,
} from "@/page/App/components/DotPanel/interface"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import {
  getDragResult,
  getReflowResult,
} from "@/page/App/components/DotPanel/calc"
import { useDrop } from "react-dnd"
import { PreviewPlaceholder } from "@/page/App/components/DotPanel/previewPlaceholder"
import { throttle } from "lodash"
import { ContainerEmptyState } from "@/widgetLibrary/ContainerWidget/emptyState"
import { FreezePlaceholder } from "@/page/App/components/DotPanel/freezePlaceholder"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"
import { BasicContainer } from "@/widgetLibrary/BasicContainer/BasicContainer"

const UNIT_HEIGHT = 8
const BASIC_BLOCK_COLUMNS = 64

export const RenderComponentCanvas: FC<{
  componentNode: ComponentNode
  containerRef: RefObject<HTMLDivElement>
  containerPadding: number
  minHeight?: number
  canResizeY?: boolean
  safeRowNumber: number
  blockColumns?: number
}> = (props) => {
  const {
    componentNode,
    containerRef,
    containerPadding,
    minHeight,
    canResizeY = true,
    safeRowNumber,
    blockColumns = BASIC_BLOCK_COLUMNS,
  } = props

  const isShowCanvasDot = useSelector(isShowDot)
  const illaMode = useSelector(getIllaMode)
  const isFreezeCanvas = useSelector(getFreezeState)
  const dispatch = useDispatch()

  const [xy, setXY] = useState([0, 0])
  const [lunchXY, setLunchXY] = useState([0, 0])
  const [canDrop, setCanDrop] = useState(true)
  const [rowNumber, setRowNumber] = useState(0)
  const [collisionEffect, setCollisionEffect] = useState(
    new Map<string, ComponentNode>(),
  )

  const [canvasRef, bounds] = useMeasure()
  const currentCanvasRef = useRef<HTMLDivElement>(
    null,
  ) as MutableRefObject<HTMLDivElement | null>

  const unitWidth = useMemo(() => {
    return bounds.width / blockColumns
  }, [blockColumns, bounds.width])

  const componentTree = useMemo<ReactNode>(() => {
    const childrenNode = componentNode.childrenNode
    if (
      componentNode.type === "CANVAS" &&
      (!Array.isArray(componentNode.childrenNode) ||
        componentNode.childrenNode.length === 0) &&
      !isShowCanvasDot
    ) {
      return <ContainerEmptyState />
    }
    return childrenNode?.map<ReactNode>((item) => {
      const h = item.h * UNIT_HEIGHT
      const w = item.w * unitWidth
      const x = item.x * unitWidth
      const y = item.y * UNIT_HEIGHT

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
            />
          )
        case "EDITOR_SCALE_SQUARE":
          const widget = widgetBuilder(item.type)
          if (!widget) return null
          return (
            <ScaleSquare
              key={item.displayName}
              componentNode={item}
              h={h}
              w={w}
              x={x}
              y={y}
              unitW={unitWidth}
              unitH={UNIT_HEIGHT}
              containerHeight={containerHeight}
              containerPadding={containerPadding}
              childrenNode={componentNode.childrenNode}
              collisionEffect={collisionEffect}
            />
          )
        default:
          return null
      }
    })
  }, [
    canResizeY,
    collisionEffect,
    componentNode.childrenNode,
    componentNode.displayName,
    componentNode.h,
    componentNode.type,
    containerPadding,
    isShowCanvasDot,
    minHeight,
    rowNumber,
    safeRowNumber,
    unitWidth,
  ])

  const updateComponentPositionByReflow = useCallback(
    (updateSlice: DebounceUpdateReflow[]) => {
      dispatch(componentsActions.updateComponentReflowReducer(updateSlice))
    },
    [dispatch],
  )

  const debounceUpdateComponentPositionByReflow = throttle(
    updateComponentPositionByReflow,
    60,
  )

  const [{ isActive, nodeWidth, nodeHeight }, dropTarget] = useDrop<
    DragInfo,
    DropResultInfo,
    DropCollectedInfo
  >(
    () => ({
      accept: ["components"],
      canDrop: () => {
        return illaMode === "edit"
      },
      hover: (dragInfo, monitor) => {
        if (!monitor.isOver({ shallow: true })) {
          setCollisionEffect(new Map())
        }
        if (monitor.isOver({ shallow: true }) && monitor.getClientOffset()) {
          const { item } = dragInfo
          const scale = blockColumns / BASIC_BLOCK_COLUMNS

          const scaleItem: ComponentNode = {
            ...item,
            w: item.w * scale,
          }
          console.log("scaleItem", scaleItem)
          let dragResult
          if (
            (item.x === -1 && item.y === -1) ||
            item.parentNode !== componentNode.displayName
          ) {
            dragResult = getDragResult(
              monitor,
              containerRef,
              scaleItem,
              unitWidth,
              UNIT_HEIGHT,
              bounds.width,
              "ADD",
              bounds.height,
              canResizeY,
            )
          } else {
            dragResult = getDragResult(
              monitor,
              containerRef,
              item,
              unitWidth,
              UNIT_HEIGHT,
              bounds.width,
              "UPDATE",
              bounds.height,
              canResizeY,
            )
          }
          const { ladingPosition, rectCenterPosition } = dragResult
          const { landingX, landingY, isOverstep } = ladingPosition

          /**
           * add rows when node over canvas
           */
          if (
            canResizeY &&
            landingY / UNIT_HEIGHT + item.h > rowNumber - safeRowNumber
          ) {
            const finalNumber = landingY / UNIT_HEIGHT + item.h + safeRowNumber
            setRowNumber(finalNumber)
            containerRef.current?.scrollTo({
              top: bounds.height,
            })
          }

          let childrenNodes = dragInfo.childrenNodes.filter(
            (node) => node.parentNode === componentNode.displayName,
          )
          const indexOfChildrenNodes = childrenNodes.findIndex(
            (node) => node.displayName === item.displayName,
          )
          let finalChildrenNodes: ComponentNode[] = []
          let finalEffectResultMap: Map<string, ComponentNode> = new Map()
          /**
           * generate component node with new position
           */
          const oldParentDisplayName = item.parentNode
          const newItem = {
            ...scaleItem,
            parentNode: componentNode.displayName || "root",
            x: Math.round(landingX / unitWidth),
            y: Math.round(landingY / UNIT_HEIGHT),
            unitW: unitWidth,
            unitH: UNIT_HEIGHT,
          }

          /**
           * only when add component nodes
           */
          if (indexOfChildrenNodes === -1) {
            const allChildrenNodes = [...childrenNodes, newItem]
            const { finalState, effectResultMap } = getReflowResult(
              newItem,
              allChildrenNodes,
            )
            finalChildrenNodes = finalState
            finalEffectResultMap = effectResultMap
          } else {
            const indexOfChildren = childrenNodes.findIndex(
              (node) => node.displayName === newItem.displayName,
            )
            const allChildrenNodes = [...childrenNodes]
            allChildrenNodes.splice(indexOfChildren, 1, newItem)
            const { finalState, effectResultMap } = getReflowResult(
              newItem,
              allChildrenNodes,
            )
            finalChildrenNodes = finalState
            finalEffectResultMap = effectResultMap
          }
          if (!isFreezeCanvas) {
            const updateSlice = [
              {
                parentDisplayName: componentNode.displayName || "root",
                childNodes: finalChildrenNodes,
              },
            ]

            if (newItem.parentNode !== oldParentDisplayName) {
              let oldParentChildNodes = dragInfo.childrenNodes.filter(
                (node) => node.parentNode === oldParentDisplayName,
              )
              if (oldParentChildNodes.length > 0) {
                const indexOfOldChildren = oldParentChildNodes.findIndex(
                  (node) => node.displayName === newItem.displayName,
                )
                const allChildrenNodes = [...oldParentChildNodes]
                if (indexOfChildrenNodes !== -1) {
                  allChildrenNodes.splice(indexOfOldChildren, 1, newItem)
                }
                updateSlice.push({
                  parentDisplayName: oldParentDisplayName as string,
                  childNodes: allChildrenNodes,
                })
              }
            }
            debounceUpdateComponentPositionByReflow(updateSlice)
            setCollisionEffect(new Map())
          } else {
            setCollisionEffect(finalEffectResultMap)
          }
          setXY([rectCenterPosition.x, rectCenterPosition.y])
          setLunchXY([landingX, landingY])
          setCanDrop(isOverstep)
        }
      },
      drop: (dragInfo, monitor) => {
        const isDrop = monitor.didDrop()
        const { item } = dragInfo
        if (isDrop || item.displayName === componentNode.displayName) return
        if (monitor.getClientOffset()) {
          const scale = blockColumns / BASIC_BLOCK_COLUMNS

          const scaleItem: ComponentNode = {
            ...item,
            w: item.w * scale,
          }
          let dragResult
          if (
            (item.x === -1 && item.y === -1) ||
            item.parentNode !== componentNode.displayName
          ) {
            dragResult = getDragResult(
              monitor,
              containerRef,
              scaleItem,
              unitWidth,
              UNIT_HEIGHT,
              bounds.width,
              "ADD",
              bounds.height,
              canResizeY,
            )
          } else {
            dragResult = getDragResult(
              monitor,
              containerRef,
              scaleItem,
              unitWidth,
              UNIT_HEIGHT,
              bounds.width,
              "UPDATE",
              bounds.height,
              canResizeY,
            )
          }
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

          /**
           * add new nodes
           */
          if (item.x === -1 && item.y === -1) {
            dispatch(componentsActions.addComponentReducer([newItem]))
          } else {
            /**
             * update node when change container
             */
            if (oldParentNodeDisplayName !== componentNode.displayName) {
              dispatch(
                componentsActions.updateComponentContainerReducer({
                  isMove: false,
                  updateSlice: [
                    {
                      component: newItem,
                      oldParentDisplayName: oldParentNodeDisplayName,
                    },
                  ],
                }),
              )
            } else {
              dispatch(
                componentsActions.updateComponentsShape({
                  isMove: false,
                  components: [newItem],
                }),
              )
            }
          }
          setCollisionEffect(new Map())
          return {
            isDropOnCanvas: true,
          }
        }
        return {
          isDropOnCanvas: false,
        }
      },
      collect: (monitor) => {
        const dragInfo = monitor.getItem()
        const scale = blockColumns / BASIC_BLOCK_COLUMNS
        return {
          isActive: monitor.canDrop() && monitor.isOver({ shallow: true }),
          nodeWidth: dragInfo?.item?.w * scale ?? 0,
          nodeHeight: dragInfo?.item?.h ?? 0,
        }
      },
    }),
    [bounds, unitWidth, UNIT_HEIGHT, canDrop, isFreezeCanvas, componentNode],
  )

  useEffect(() => {
    if (!isActive && canResizeY) {
      const childrenNodes = componentNode.childrenNode
      let maxY = 0
      childrenNodes?.forEach((node) => {
        maxY = Math.max(maxY, node.y + node.h)
      })
      if (illaMode === "edit") {
        setRowNumber(
          Math.max(
            maxY + safeRowNumber,
            Math.floor((minHeight || document.body.clientHeight) / UNIT_HEIGHT),
          ),
        )
      } else {
        setRowNumber(Math.max(maxY, bounds.height / UNIT_HEIGHT))
      }
    }
  }, [
    bounds.height,
    canResizeY,
    componentNode.childrenNode,
    illaMode,
    isActive,
    minHeight,
    safeRowNumber,
  ])

  return (
    <div
      ref={(node) => {
        currentCanvasRef.current = node
        dropTarget(node)
        canvasRef(node)
      }}
      id="realCanvas"
      css={applyComponentCanvasStyle(
        bounds.width,
        bounds.height,
        bounds.width / blockColumns,
        UNIT_HEIGHT,
        isShowCanvasDot,
        rowNumber * 8,
        minHeight,
      )}
      onClick={(e) => {
        if (
          e.target === currentCanvasRef.current &&
          illaMode !== "production"
        ) {
          dispatch(configActions.updateSelectedComponent([]))
        }
      }}
    >
      {componentTree}
      {isActive && (
        <PreviewPlaceholder
          x={xy[0]}
          y={xy[1]}
          lunchX={lunchXY[0]}
          lunchY={lunchXY[1]}
          w={nodeWidth * unitWidth}
          h={nodeHeight * UNIT_HEIGHT}
          canDrop={canDrop}
        />
      )}
      {isShowCanvasDot && <div css={borderLineStyle} />}
      <FreezePlaceholder
        effectMap={collisionEffect}
        unitW={unitWidth}
        unitH={UNIT_HEIGHT}
      />
    </div>
  )
}
