import {
  FC,
  MutableRefObject,
  ReactNode,
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
import { DropCollectedInfo } from "@/page/App/components/DotPanel/interface"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import {
  calcRectCenterPointPosition,
  calcRectShapeByCenterPoint,
} from "@/page/App/components/DotPanel/calc"
import { useDrop } from "react-dnd"
import { PreviewPlaceholder } from "@/page/App/components/DotPanel/previewPlaceholder"

const UNIT_HEIGHT = 8
const BLOCK_COLUMNS = 64

export const RenderComponentCanvas: FC<{
  componentNode: ComponentNode
}> = (props) => {
  const { componentNode } = props

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
  const [canDrop, setCanDrop] = useState(true)

  const [{ isActive, nodeWidth, nodeHeight }, dropTarget] = useDrop<
    ComponentNode,
    void,
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
            y: monitor.getClientOffset()!.y,
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
          const { rectTop, rectRight, rectBottom, rectLeft } =
            calcRectShapeByCenterPoint(rectCenterPosition, nodeWidthAndHeight)

          setXY([rectCenterPosition.x, rectCenterPosition.y])
          if (rectTop < 0 || rectLeft < 0 || rectRight > bounds.width) {
            setCanDrop(false)
          } else {
            setCanDrop(true)
          }
        }
      },
      drop: (item, monitor) => {
        if (!canDrop) {
          return
        }
        if (monitor.getClientOffset()) {
          const itemPosition = {
            x: monitor.getClientOffset()!.x,
            y: monitor.getClientOffset()!.y,
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
          const { rectTop, rectLeft } = calcRectShapeByCenterPoint(
            rectCenterPosition,
            nodeWidthAndHeight,
          )
          const newItem = {
            ...item,
            parentNode: componentNode.displayName || "root",
            x: Math.round(rectLeft / unitWidth),
            y: Math.round(rectTop / UNIT_HEIGHT),
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
        console.log(e.target)
      }}
    >
      {componentTree}
      {isActive && (
        <PreviewPlaceholder
          x={xy[0]}
          y={xy[1]}
          w={nodeWidth * unitWidth}
          h={nodeHeight * UNIT_HEIGHT}
          canDrop={canDrop}
        />
      )}
    </div>
  )
}
