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
import { getIllaMode, isShowDot } from "@/redux/config/configSelector"
import { ScaleSquare } from "@/page/App/components/ScaleSquare"
import { DotPanel } from "@/page/App/components/DotPanel/index"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { applyComponentCanvasStyle } from "@/page/App/components/DotPanel/style"
import useMeasure from "react-use-measure"
import { configActions } from "@/redux/config/configSlice"
import {
  DragInfo,
  DropCollectedInfo,
  DropResultInfo,
} from "@/page/App/components/DotPanel/interface"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import {
  calcLunchPosition,
  calcRectCenterPointPosition,
  calcRectShapeByCenterPoint,
  changeCrossingNodePosition,
} from "@/page/App/components/DotPanel/calc"
import { useDrop } from "react-dnd"
import { PreviewPlaceholder } from "@/page/App/components/DotPanel/previewPlaceholder"
import { cloneDeep, debounce, throttle } from "lodash"

const UNIT_HEIGHT = 8
const BLOCK_COLUMNS = 64

export const RenderComponentCanvas: FC<{
  componentNode: ComponentNode
  containerRef: RefObject<HTMLDivElement>
}> = (props) => {
  const { componentNode, containerRef } = props

  const isShowCanvasDot = useSelector(isShowDot)
  const illaMode = useSelector(getIllaMode)
  const dispatch = useDispatch()

  const [canvasRef, bounds] = useMeasure()
  const currentCanvasRef = useRef<HTMLDivElement>(
    null,
  ) as MutableRefObject<HTMLDivElement | null>

  const unitWidth = useMemo(() => {
    return bounds.width / BLOCK_COLUMNS
  }, [bounds.width])

  const componentTree = useMemo<ReactNode>(() => {
    const childrenNode = componentNode.childrenNode
    return childrenNode.map<ReactNode>((item) => {
      const h = item.h * UNIT_HEIGHT
      const w = item.w * unitWidth
      const x = item.x * unitWidth
      const y = item.y * UNIT_HEIGHT

      switch (item.containerType) {
        case "EDITOR_DOT_PANEL":
          return <DotPanel componentNode={item} key={item.displayName} />
        case "EDITOR_SCALE_SQUARE":
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
            />
          )
        default:
          return null
      }
    })
  }, [componentNode.childrenNode, unitWidth])

  const [xy, setXY] = useState([0, 0])
  const [lunchXY, setLunchXY] = useState([0, 0])
  const [canDrop, setCanDrop] = useState(true)
  const [rowNumber, setRowNumber] = useState(0)

  const updateComponentPositionByReflow = useCallback(
    (parentDisplayName: string, childrenNodes: ComponentNode[]) => {
      dispatch(
        componentsActions.updateComponentReflow({
          parentDisplayName: parentDisplayName,
          childNodes: childrenNodes,
        }),
      )
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
        if (monitor.getClientOffset()) {
          const { item } = dragInfo
          const itemPosition = {
            x: monitor.getClientOffset()!.x,
            y:
              monitor.getClientOffset()!.y +
              (containerRef.current?.scrollTop || 0),
          }
          const canvasPosition = {
            x: containerRef.current?.getBoundingClientRect().x || 0,
            y: containerRef.current?.getBoundingClientRect().y || 0,
          }
          const nodeWidthAndHeight = {
            w: item.w * unitWidth,
            h: item.h * UNIT_HEIGHT,
          }
          const rectCenterPosition = calcRectCenterPointPosition(
            itemPosition,
            canvasPosition,
            nodeWidthAndHeight,
          )
          const rectPosition = calcRectShapeByCenterPoint(
            rectCenterPosition,
            nodeWidthAndHeight,
          )

          const { lunchX, lunchY, isOverstep } = calcLunchPosition(
            rectPosition,
            unitWidth,
            UNIT_HEIGHT,
            bounds.width,
          )

          if (lunchY / UNIT_HEIGHT + item.h > rowNumber - 8) {
            const finalNumber = lunchY / UNIT_HEIGHT + item.h + 8
            setRowNumber(finalNumber)
            containerRef.current?.scrollTo({
              top: bounds.height,
            })
          }

          const childrenNodes = dragInfo.childrenNodes
          const indexOfChildrenNodes = childrenNodes.findIndex(
            (node) => node.displayName === item.displayName,
          )
          let finalChildrenNodes: ComponentNode[] = []
          const newItem = {
            ...item,
            parentNode: componentNode.displayName || "root",
            x: Math.round(lunchX / unitWidth),
            y: Math.round(lunchY / UNIT_HEIGHT),
            unitW: unitWidth,
            unitH: UNIT_HEIGHT,
          }
          if (indexOfChildrenNodes === -1) {
            const allChildrenNodes = [...childrenNodes, newItem]
            allChildrenNodes.sort((node1, node2) => {
              if (node1.y < node2.y) {
                return -1
              }
              if (node1.y > node2.y) {
                return 1
              }
              if (node1.y === node2.y) {
                if (node1.x > node2.x) {
                  return 1
                }
                if (node1.x < node2.x) {
                  return -1
                }
              }
              return 0
            })
            const walkedDisplayNameSet = new Set<string>()
            changeCrossingNodePosition(
              newItem,
              allChildrenNodes,
              walkedDisplayNameSet,
            )
            finalChildrenNodes = allChildrenNodes.filter(
              (node) => node.displayName !== newItem.displayName,
            )
          } else {
            const indexOfChildren = childrenNodes.findIndex(
              (node) => node.displayName === newItem.displayName,
            )
            const allChildrenNodes = [...childrenNodes]
            allChildrenNodes.splice(indexOfChildren, 1, newItem)
            allChildrenNodes.sort((node1, node2) => {
              if (node1.y < node2.y) {
                return -1
              }
              if (node1.y > node2.y) {
                return 1
              }
              if (node1.y === node2.y) {
                if (node1.x > node2.x) {
                  return 1
                }
                if (node1.x < node2.x) {
                  return -1
                }
              }
              return 0
            })
            const walkedDisplayNameSet = new Set<string>()
            changeCrossingNodePosition(
              newItem,
              allChildrenNodes,
              walkedDisplayNameSet,
            )
            finalChildrenNodes = allChildrenNodes.filter(
              (node) => node.displayName !== newItem.displayName,
            )
          }

          debounceUpdateComponentPositionByReflow(
            componentNode.displayName || "root",
            finalChildrenNodes,
          )
          setXY([rectCenterPosition.x, rectCenterPosition.y])
          setLunchXY([lunchX, lunchY])
          setCanDrop(isOverstep)
        }
      },
      drop: (dragInfo, monitor) => {
        if (monitor.getClientOffset()) {
          const { item } = dragInfo
          const itemPosition = {
            x: monitor.getClientOffset()!.x,
            y:
              monitor.getClientOffset()!.y +
              (containerRef.current?.scrollTop || 0),
          }
          const canvasPosition = {
            x: containerRef.current?.getBoundingClientRect().x || 0,
            y: containerRef.current?.getBoundingClientRect().y || 0,
          }
          const nodeWidthAndHeight = {
            w: item.w * unitWidth,
            h: item.h * UNIT_HEIGHT,
          }
          const rectCenterPosition = calcRectCenterPointPosition(
            itemPosition,
            canvasPosition,
            nodeWidthAndHeight,
          )
          const rectPosition = calcRectShapeByCenterPoint(
            rectCenterPosition,
            nodeWidthAndHeight,
          )
          const { lunchX, lunchY } = calcLunchPosition(
            rectPosition,
            unitWidth,
            UNIT_HEIGHT,
            bounds.width,
          )
          const newItem = {
            ...item,
            parentNode: componentNode.displayName || "root",
            x: Math.round(lunchX / unitWidth),
            y: Math.round(lunchY / UNIT_HEIGHT),
            unitW: unitWidth,
            unitH: UNIT_HEIGHT,
          }
          if (item.x === -1 && item.y === -1) {
            dispatch(componentsActions.addComponentReducer([newItem]))
          } else {
            dispatch(
              componentsActions.updateComponentPositionAndSizeReducer({
                parentDisplayName: newItem.parentNode || "",
                displayName: newItem.displayName,
                x: newItem.x,
                y: newItem.y,
                w: newItem.w,
                h: newItem.h,
              }),
            )
          }
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
        return {
          isActive: monitor.canDrop() && monitor.isOver(),
          nodeWidth: dragInfo?.item?.w ?? 0,
          nodeHeight: dragInfo?.item?.h ?? 0,
        }
      },
    }),
    [bounds, unitWidth, UNIT_HEIGHT, canDrop],
  )

  useEffect(() => {
    if (!isActive) {
      const childrenNodes = componentNode.childrenNode
      let maxY = 0
      childrenNodes.forEach((node) => {
        maxY = Math.max(maxY, node.y + node.h)
      })
      if (illaMode === "edit") {
        setRowNumber(
          Math.max(
            maxY + 8,
            Math.floor(document.body.clientHeight / UNIT_HEIGHT),
          ),
        )
      } else {
        setRowNumber(Math.max(maxY, bounds.height / UNIT_HEIGHT))
      }
    }
  }, [bounds.height, componentNode.childrenNode, illaMode, isActive])

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
        bounds.width / BLOCK_COLUMNS,
        UNIT_HEIGHT,
        isShowCanvasDot,
        rowNumber * 8,
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
    </div>
  )
}
