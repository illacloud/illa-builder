import {
  FC,
  MutableRefObject,
  ReactNode,
  RefObject,
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
  DropCollectedInfo,
  DropResultInfo,
} from "@/page/App/components/DotPanel/interface"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import {
  calcLunchPosition,
  calcRectCenterPointPosition,
  calcRectShapeByCenterPoint,
} from "@/page/App/components/DotPanel/calc"
import { useDrop } from "react-dnd"
import { PreviewPlaceholder } from "@/page/App/components/DotPanel/previewPlaceholder"

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

  const [{ isActive, nodeWidth, nodeHeight }, dropTarget] = useDrop<
    ComponentNode,
    DropResultInfo,
    DropCollectedInfo
  >(
    () => ({
      accept: ["components"],
      canDrop: () => {
        return illaMode === "edit"
      },
      hover: (item, monitor) => {
        if (monitor.getClientOffset()) {
          const itemPosition = {
            x: monitor.getClientOffset()!.x,
            y:
              monitor.getClientOffset()!.y +
              (containerRef.current?.scrollTop || 0),
          }
          const canvasPosition = {
            x: bounds.x,
            y: bounds.y,
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
          setXY([rectCenterPosition.x, rectCenterPosition.y])
          setLunchXY([lunchX, lunchY])
          setCanDrop(isOverstep)
        }
      },
      drop: (item, monitor) => {
        if (monitor.getClientOffset()) {
          const itemPosition = {
            x: monitor.getClientOffset()!.x,
            y:
              monitor.getClientOffset()!.y +
              (containerRef.current?.scrollTop || 0),
          }
          const canvasPosition = {
            x: bounds.x,
            y: bounds.y,
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
            dispatch(componentsActions.addComponentReducer(newItem))
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
        const item = monitor.getItem()
        return {
          isActive: monitor.canDrop() && monitor.isOver(),
          nodeWidth: item?.w ?? 0,
          nodeHeight: item?.h ?? 0,
        }
      },
    }),
    [bounds, unitWidth, UNIT_HEIGHT, canDrop],
  )

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
