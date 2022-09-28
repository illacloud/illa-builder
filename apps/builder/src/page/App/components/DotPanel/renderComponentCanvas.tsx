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
  getFreezyState,
  getIllaMode,
  isShowDot,
} from "@/redux/config/configSelector"
import { ScaleSquare } from "@/page/App/components/ScaleSquare"
import { DotPanel } from "@/page/App/components/DotPanel/index"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import {
  applyComponentCanvasStyle,
  borderLineStyle,
} from "@/page/App/components/DotPanel/style"
import useMeasure from "react-use-measure"
import { configActions } from "@/redux/config/configSlice"
import {
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
import { cloneDeep, throttle } from "lodash"
import { searchDSLByDisplayName } from "@/redux/currentApp/editor/components/componentsSelector"

const UNIT_HEIGHT = 8
const BLOCK_COLUMNS = 64

export const RenderComponentCanvas: FC<{
  componentNode: ComponentNode
  containerRef: RefObject<HTMLDivElement>
  containerPadding: number
  minHeight?: number
}> = props => {
  const { componentNode, containerRef, containerPadding, minHeight } = props

  const isShowCanvasDot = useSelector(isShowDot)
  const illaMode = useSelector(getIllaMode)
  const isFreezyCanvas = useSelector(getFreezyState)
  const dispatch = useDispatch()

  const [xy, setXY] = useState([0, 0])
  const [lunchXY, setLunchXY] = useState([0, 0])
  const [canDrop, setCanDrop] = useState(true)
  const [rowNumber, setRowNumber] = useState(0)

  const [canvasRef, bounds] = useMeasure()
  const currentCanvasRef = useRef<HTMLDivElement>(
    null,
  ) as MutableRefObject<HTMLDivElement | null>

  const unitWidth = useMemo(() => {
    return bounds.width / BLOCK_COLUMNS
  }, [bounds.width])

  const componentTree = useMemo<ReactNode>(() => {
    const childrenNode = componentNode.childrenNode
    return childrenNode?.map<ReactNode>(item => {
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
              containerHeight={containerHeight}
              containerPadding={containerPadding}
              childrenNode={componentNode.childrenNode}
            />
          )
        default:
          return null
      }
    })
  }, [
    componentNode.childrenNode,
    componentNode.displayName,
    componentNode.h,
    containerPadding,
    rowNumber,
    unitWidth,
  ])

  const updateComponentPositionByReflow = useCallback(
    (parentDisplayName: string, childrenNodes: ComponentNode[]) => {
      dispatch(
        componentsActions.updateComponentReflowReducer({
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
        if (monitor.isOver({ shallow: true }) && monitor.getClientOffset()) {
          const { item } = dragInfo
          const dragResult = getDragResult(
            monitor,
            containerRef,
            item,
            unitWidth,
            UNIT_HEIGHT,
            bounds.width,
          )
          const { ladingPosition, rectCenterPosition } = dragResult
          const { landingX, landingY, isOverstep } = ladingPosition

          /**
           * add rows when node over canvas
           */
          if (landingY / UNIT_HEIGHT + item.h > rowNumber - 8) {
            const finalNumber = landingY / UNIT_HEIGHT + item.h + 8
            setRowNumber(finalNumber)
            containerRef.current?.scrollTo({
              top: bounds.height,
            })
          }

          const childrenNodes = dragInfo.childrenNodes
          const indexOfChildrenNodes = childrenNodes.findIndex(
            node => node.displayName === item.displayName,
          )
          let finalChildrenNodes: ComponentNode[] = []
          let finalEffectResultMap: Map<string, ComponentNode> = new Map()
          /**
           * generate component node with new position
           */
          const newItem = {
            ...item,
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
            const { finalState } = getReflowResult(newItem, allChildrenNodes)
            finalChildrenNodes = finalState
          } else {
            const indexOfChildren = childrenNodes.findIndex(
              node => node.displayName === newItem.displayName,
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
          if (!isFreezyCanvas) {
            debounceUpdateComponentPositionByReflow(
              componentNode.displayName || "root",
              finalChildrenNodes,
            )
          } else {
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
          const dragResult = getDragResult(
            monitor,
            containerRef,
            item,
            unitWidth,
            UNIT_HEIGHT,
            bounds.width,
          )
          const { ladingPosition } = dragResult
          const { landingX, landingY } = ladingPosition

          /**
           * generate component node with new position
           */
          const oldParentNodeDisplayName = item.parentNode || "root"
          const newItem = {
            ...item,
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
            if (componentNode.type === "CONTAINER_WIDGET") {
              const currentViewIndex =
                componentNode.props?.currentViewIndex || 0
              const currentViewComponentsArray = cloneDeep(
                componentNode.props?.viewComponentsArray,
              ) || [[]]
              if (currentViewIndex < currentViewComponentsArray.length) {
                const currentViewComponents =
                  currentViewComponentsArray[currentViewIndex]
                currentViewComponents.push(newItem.displayName)
                dispatch(
                  componentsActions.updateContainerViewsComponentsReducer({
                    displayName: componentNode.displayName,
                    viewComponentsArray: currentViewComponentsArray,
                  }),
                )
              }
            }
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
              const oldParentNode = searchDSLByDisplayName(
                oldParentNodeDisplayName,
              )
              if (componentNode.type === "CONTAINER_WIDGET") {
                const currentViewIndex =
                  componentNode.props?.currentViewIndex || 0
                const currentViewComponentsArray = cloneDeep(
                  componentNode.props?.viewComponentsArray,
                ) || [[]]
                if (currentViewIndex < currentViewComponentsArray.length) {
                  const currentViewComponents =
                    currentViewComponentsArray[currentViewIndex]
                  currentViewComponents.push(newItem.displayName)
                  dispatch(
                    componentsActions.updateContainerViewsComponentsReducer({
                      displayName: componentNode.displayName,
                      viewComponentsArray: currentViewComponentsArray,
                    }),
                  )
                }
              }
              if (oldParentNode && oldParentNode.type === "CONTAINER_WIDGET") {
                const currentViewIndex =
                  oldParentNode.props?.currentViewIndex || 0
                const currentViewComponentsArray = cloneDeep(
                  oldParentNode.props?.viewComponentsArray,
                ) || [[]]
                if (currentViewIndex < currentViewComponentsArray.length) {
                  const currentViewComponents = currentViewComponentsArray[
                    currentViewIndex
                  ] as string[]
                  const indexOfNewItem = currentViewComponents.findIndex(
                    displayName => displayName === newItem.displayName,
                  )
                  if (indexOfNewItem !== -1) {
                    currentViewComponents.splice(indexOfNewItem, 1)
                    dispatch(
                      componentsActions.updateContainerViewsComponentsReducer({
                        displayName: oldParentNodeDisplayName,
                        viewComponentsArray: currentViewComponentsArray,
                      }),
                    )
                  }
                }
              }
            } else {
              dispatch(
                componentsActions.updateComponentsShape({
                  isMove: false,
                  components: [newItem],
                }),
              )
            }
          }

          return {
            isDropOnCanvas: true,
          }
        }
        return {
          isDropOnCanvas: false,
        }
      },
      collect: monitor => {
        const dragInfo = monitor.getItem()
        return {
          isActive: monitor.canDrop() && monitor.isOver({ shallow: true }),
          nodeWidth: dragInfo?.item?.w ?? 0,
          nodeHeight: dragInfo?.item?.h ?? 0,
        }
      },
    }),
    [bounds, unitWidth, UNIT_HEIGHT, canDrop, isFreezyCanvas],
  )

  useEffect(() => {
    if (!isActive) {
      const childrenNodes = componentNode.childrenNode
      let maxY = 0
      childrenNodes?.forEach(node => {
        maxY = Math.max(maxY, node.y + node.h)
      })
      if (illaMode === "edit") {
        setRowNumber(
          Math.max(
            maxY + 8,
            Math.floor((minHeight || document.body.clientHeight) / UNIT_HEIGHT),
          ),
        )
      } else {
        setRowNumber(Math.max(maxY, bounds.height / UNIT_HEIGHT))
      }
    }
  }, [bounds.height, componentNode.childrenNode, illaMode, isActive, minHeight])

  return (
    <div
      ref={node => {
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
        minHeight,
      )}
      onClick={e => {
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
    </div>
  )
}
