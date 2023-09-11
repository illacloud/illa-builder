import { Resizable, ResizeCallback, ResizeStartCallback } from "re-resizable"
import {
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useDrop } from "react-dnd"
import { useDispatch, useSelector } from "react-redux"
import useMeasure from "react-use-measure"
import { ReactComponent as ResizeBar } from "@/assets/resizeBar.svg"
import { DropResultInfo } from "@/page/App/components/DotPanel/components/Canvas/interface"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import { DragInfo } from "@/page/App/components/ScaleSquare/components/DragContainer/interface"
import {
  applyDashedLineStyle,
  applyXDirectionDashedLineStyle,
} from "@/page/App/components/ScaleSquare/style"
import { getIsILLAEditMode } from "@/redux/config/configSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { RenderChildrenCanvas } from "../PublicSector/RenderChildrenCanvas"
import { ModalWidgetProps } from "./interface"
import {
  formBodyStyle,
  formContainerStyle,
  formHeaderStyle,
  resizeBarStyle,
  resizeLineStyle,
} from "./style"
import {
  MODAL_BODY_MARGIN,
  MODAL_BODY_MIN_HEIGHT,
  MODAL_MIN_FOOTER_HEIGHT_ROW_NUMBER,
  MODAL_MIN_HEADER_HEIGHT_ROW_NUMBER,
} from "./widgetConfig"

interface DragCollection {
  isDraggingActive: boolean
}

export const ModalWidget: FC<ModalWidgetProps> = (props) => {
  const {
    childrenNode,
    showFooter,
    showHeader,
    headerHeight,
    footerHeight,
    isVisible,
    columnNumber,
    displayName,
    handleUpdateOriginalDSLMultiAttr,
    triggerEventHandler,
  } = props

  const prevVisible = useRef<boolean>()
  const isMount = useRef(false)
  const dispatch = useDispatch()

  useEffect(() => {
    isMount.current = true

    return () => {
      isMount.current = false
    }
  }, [])

  useEffect(() => {
    if (isVisible && prevVisible.current !== isVisible && isMount.current) {
      triggerEventHandler("onOpenModal")
      prevVisible.current = true
    }

    return () => {
      if (isVisible && !isMount.current) {
        triggerEventHandler("onCloseModal")
      }
    }
  }, [isVisible, triggerEventHandler])

  const [containerRef, containerBounds] = useMeasure()
  const containerNodeRef = useRef<HTMLDivElement>(
    null,
  ) as MutableRefObject<HTMLDivElement | null>
  const [isMouseHover, setIsMouseHover] = useState(false)

  const headerMinHeight = useMemo(
    () => MODAL_MIN_HEADER_HEIGHT_ROW_NUMBER * UNIT_HEIGHT,
    [],
  )
  const footerMinHeight = useMemo(
    () => MODAL_MIN_FOOTER_HEIGHT_ROW_NUMBER * UNIT_HEIGHT,
    [],
  )

  const headerMaxHeight = useMemo(() => {
    return (
      Math.floor(
        (containerBounds.height -
          (MODAL_BODY_MIN_HEIGHT + 2 * MODAL_BODY_MARGIN) -
          footerHeight * UNIT_HEIGHT) /
          UNIT_HEIGHT,
      ) * UNIT_HEIGHT
    )
  }, [containerBounds.height, footerHeight])

  const footerMaxHeight = useMemo(() => {
    return (
      Math.floor(
        (containerBounds.height -
          (MODAL_BODY_MIN_HEIGHT + 2 * MODAL_BODY_MARGIN) -
          headerHeight * UNIT_HEIGHT) /
          UNIT_HEIGHT,
      ) * UNIT_HEIGHT
    )
  }, [containerBounds.height, headerHeight])

  const isEditMode = useSelector(getIsILLAEditMode)

  const handleUpdateHeight = useCallback((_height: number) => {
    // console.log("height", height)
    // TODO: auto height
  }, [])

  const renderHeader = useMemo(() => {
    const headerComponentNode = childrenNode[0]
    return (
      <RenderChildrenCanvas
        currentComponentNode={headerComponentNode}
        columnNumber={columnNumber}
        handleUpdateHeight={handleUpdateHeight}
      />
    )
  }, [childrenNode, columnNumber, handleUpdateHeight])

  const renderBody = useMemo(() => {
    const bodyComponentNode = childrenNode[1]

    return (
      <RenderChildrenCanvas
        currentComponentNode={bodyComponentNode}
        columnNumber={columnNumber}
        handleUpdateHeight={handleUpdateHeight}
      />
    )
  }, [childrenNode, columnNumber, handleUpdateHeight])

  const renderFooter = useMemo(() => {
    const footerComponentNode = childrenNode[2]
    return (
      <RenderChildrenCanvas
        currentComponentNode={footerComponentNode}
        columnNumber={columnNumber}
        handleUpdateHeight={handleUpdateHeight}
      />
    )
  }, [childrenNode, columnNumber, handleUpdateHeight])

  const resizeTopHandler = useMemo(() => {
    return {
      bottom: (
        <div css={resizeLineStyle}>
          <ResizeBar css={resizeBarStyle} />
        </div>
      ),
    }
  }, [])

  const resizeBottomHandler = useMemo(() => {
    return {
      top: (
        <div css={resizeLineStyle}>
          <ResizeBar css={resizeBarStyle} />
        </div>
      ),
    }
  }, [])

  const handleResizeStart: ResizeStartCallback = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(executionActions.setResizingNodeIDsReducer([displayName]))
  }

  const handleOnResizeTopStop: ResizeCallback = useCallback(
    (e, dir, elementRef, delta) => {
      const { height } = delta
      let finalHeight = Math.floor(
        (headerHeight * UNIT_HEIGHT + height) / UNIT_HEIGHT,
      )
      if (finalHeight * UNIT_HEIGHT >= headerMaxHeight) {
        finalHeight = Math.floor(headerMaxHeight / UNIT_HEIGHT)
      }
      handleUpdateOriginalDSLMultiAttr({
        headerHeight: finalHeight,
      })
      dispatch(executionActions.setResizingNodeIDsReducer([]))
    },
    [dispatch, handleUpdateOriginalDSLMultiAttr, headerHeight, headerMaxHeight],
  )

  const handleOnResizeBottomStop: ResizeCallback = useCallback(
    (e, dir, elementRef, delta) => {
      const { height } = delta
      let finalHeight = Math.floor(
        (footerHeight * UNIT_HEIGHT + height) / UNIT_HEIGHT,
      )
      if (finalHeight * UNIT_HEIGHT > footerMaxHeight) {
        finalHeight = Math.floor(footerMaxHeight / UNIT_HEIGHT)
      }
      handleUpdateOriginalDSLMultiAttr({
        footerHeight: finalHeight,
      })
      dispatch(executionActions.setResizingNodeIDsReducer([]))
    },
    [dispatch, footerHeight, footerMaxHeight, handleUpdateOriginalDSLMultiAttr],
  )

  const [{ isDraggingActive }, dropRef] = useDrop<
    DragInfo,
    DropResultInfo,
    DragCollection
  >(
    () => ({
      accept: ["components"],
      collect: (monitor) => {
        return {
          isDraggingActive: monitor.isOver(),
        }
      },
    }),
    [],
  )

  return (
    <div
      css={formContainerStyle}
      ref={(node) => {
        dropRef(node)
        containerRef(node)
        containerNodeRef.current = node
      }}
      onMouseEnter={() => {
        setIsMouseHover(true)
      }}
      onMouseLeave={() => {
        setIsMouseHover(false)
      }}
    >
      {showHeader && (
        <Resizable
          size={{
            width: "100%",
            height: headerHeight * UNIT_HEIGHT,
          }}
          minHeight={headerMinHeight}
          maxHeight={headerMaxHeight}
          handleComponent={
            isMouseHover && !isDraggingActive ? resizeTopHandler : undefined
          }
          enable={{
            bottom: isEditMode,
          }}
          onResizeStart={handleResizeStart}
          onResizeStop={handleOnResizeTopStop}
        >
          <div css={formHeaderStyle}>{renderHeader}</div>
          {isEditMode && isMouseHover && !isDraggingActive && (
            <div css={applyDashedLineStyle(false, true, false)} />
          )}
        </Resizable>
      )}
      <div css={formBodyStyle}>
        {renderBody}
        {isEditMode && isMouseHover && !isDraggingActive && (
          <div css={applyXDirectionDashedLineStyle(false, true, false)} />
        )}
      </div>
      {showFooter && (
        <Resizable
          size={{
            width: "100%",
            height: footerHeight * UNIT_HEIGHT,
          }}
          minHeight={footerMinHeight}
          maxHeight={footerMaxHeight}
          handleComponent={
            isMouseHover && !isDraggingActive ? resizeBottomHandler : undefined
          }
          enable={{
            top: isEditMode,
          }}
          onResizeStart={handleResizeStart}
          onResizeStop={handleOnResizeBottomStop}
        >
          <div css={formHeaderStyle}>{renderFooter}</div>
          {isEditMode && isMouseHover && !isDraggingActive && (
            <div
              css={applyDashedLineStyle(false, true, false, footerMaxHeight)}
            />
          )}
        </Resizable>
      )}
    </div>
  )
}

ModalWidget.displayName = "ModalWidget"
export default ModalWidget
