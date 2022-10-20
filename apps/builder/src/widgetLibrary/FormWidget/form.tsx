import { FC, useCallback, useMemo, useState } from "react"
import { BasicContainer } from "../BasicContainer/BasicContainer"
import { FormWIdgetProps } from "./interface"
import {
  formContainerStyle,
  formHeaderStyle,
  formBodyStyle,
  resizeLineStyle,
  resizeBarStyle,
} from "./style"
import { Resizable, ResizeCallback, ResizeStartCallback } from "re-resizable"
import { applyDashedLineStyle } from "@/page/App/components/ScaleSquare/style"
import useMeasure from "react-use-measure"
import {
  FORM_BODY_MIN_HEIGHT,
  FORM_MIN_FOOTER_HEIGHT_ROW_NUMBER,
  FORM_MIN_HEADER_HEIGHT_ROW_NUMBER,
  FORM_BODY_MARGIN,
} from "./widgetConfig"
import { ReactComponent as ResizeBar } from "@/assets/resizeBar.svg"
import { useDrop } from "react-dnd"

export const FormWidget: FC<FormWIdgetProps> = (props) => {
  const {
    childrenNode,
    showFooter,
    showHeader,
    headerHeight,
    footerHeight,
    unitH,
    handleUpdateOriginalDSLMultiAttr,
  } = props

  const [bodyRef, bodyBounds] = useMeasure()
  const [headerRef, headerBounds] = useMeasure()
  const [footerRef, footerBounds] = useMeasure()
  const [containerRef, containerBounds] = useMeasure()
  const [isMouseHover, setIsMouseHover] = useState(false)

  const headerMinHeight = useMemo(
    () => FORM_MIN_HEADER_HEIGHT_ROW_NUMBER * unitH,
    [unitH],
  )
  const footerMinHeight = useMemo(
    () => FORM_MIN_FOOTER_HEIGHT_ROW_NUMBER * unitH,
    [unitH],
  )

  const headerMaxHeight = useMemo(() => {
    return (
      Math.floor(
        (containerBounds.height -
          (FORM_BODY_MIN_HEIGHT + 2 * FORM_BODY_MARGIN) -
          footerHeight * unitH) /
          unitH,
      ) * unitH
    )
  }, [containerBounds.height, footerHeight, unitH])

  const footerMaxHeight = useMemo(() => {
    return (
      Math.floor(
        (containerBounds.height -
          (FORM_BODY_MIN_HEIGHT + 2 * FORM_BODY_MARGIN) -
          headerHeight * unitH) /
          unitH,
      ) * unitH
    )
  }, [containerBounds.height, headerHeight, unitH])

  const renderHeader = useMemo(() => {
    const headerComponentNode = childrenNode[0]
    return (
      <BasicContainer
        componentNode={headerComponentNode}
        canResizeY={false}
        minHeight={headerBounds.height}
      />
    )
  }, [childrenNode, headerBounds.height])

  const renderBody = useMemo(() => {
    const bodyComponentNode = childrenNode[1]
    return (
      <BasicContainer
        componentNode={bodyComponentNode}
        minHeight={bodyBounds.height}
      />
    )
  }, [bodyBounds.height, childrenNode])

  const renderFooter = useMemo(() => {
    const footerComponentNode = childrenNode[2]
    return (
      <BasicContainer
        componentNode={footerComponentNode}
        canResizeY={false}
        minHeight={footerBounds.height}
      />
    )
  }, [childrenNode, footerBounds.height])

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
  }

  const handleOnResizeTopStop: ResizeCallback = useCallback(
    (e, dir, elementRef, delta) => {
      const { height } = delta
      let finalHeight = Math.floor((headerHeight * unitH + height) / unitH)
      if (finalHeight * unitH >= headerMaxHeight) {
        finalHeight = Math.floor(headerMaxHeight / unitH)
      }
      handleUpdateOriginalDSLMultiAttr({
        headerHeight: finalHeight,
      })
    },
    [handleUpdateOriginalDSLMultiAttr, headerHeight, headerMaxHeight, unitH],
  )

  const handleOnResizeBottomStop: ResizeCallback = useCallback(
    (e, dir, elementRef, delta) => {
      const { height } = delta
      let finalHeight = Math.floor((footerHeight * unitH + height) / unitH)
      if (finalHeight * unitH > footerMaxHeight) {
        finalHeight = Math.floor(footerMaxHeight / unitH)
      }
      handleUpdateOriginalDSLMultiAttr({
        footerHeight: finalHeight,
      })
    },
    [footerHeight, footerMaxHeight, handleUpdateOriginalDSLMultiAttr, unitH],
  )

  const [{ isDraggingActive }, dropRef] = useDrop(() => ({
    accept: ["components"],
    hover: (dragInfo, monitor) => {},
    collect: (monitor) => {
      return {
        isDraggingActive: monitor.isOver(),
      }
    },
  }))

  return (
    <div
      css={formContainerStyle}
      ref={(node) => {
        dropRef(node)
        containerRef(node)
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
            height: headerHeight * unitH,
          }}
          minHeight={headerMinHeight}
          maxHeight={headerMaxHeight}
          handleComponent={
            isMouseHover && !isDraggingActive ? resizeTopHandler : undefined
          }
          enable={{
            bottom: true,
          }}
          onResizeStart={handleResizeStart}
          onResizeStop={handleOnResizeTopStop}
        >
          <div css={formHeaderStyle} ref={headerRef}>
            {renderHeader}
          </div>
          {isMouseHover && !isDraggingActive && (
            <div css={applyDashedLineStyle(false, true, false)} />
          )}
        </Resizable>
      )}
      <div css={formBodyStyle} ref={bodyRef}>
        {renderBody}
      </div>
      {showFooter && (
        <Resizable
          size={{
            width: "100%",
            height: footerHeight * unitH,
          }}
          minHeight={footerMinHeight}
          maxHeight={footerMaxHeight}
          handleComponent={
            isMouseHover && !isDraggingActive ? resizeBottomHandler : undefined
          }
          enable={{
            top: true,
          }}
          onResizeStart={handleResizeStart}
          onResizeStop={handleOnResizeBottomStop}
        >
          <div css={formHeaderStyle} ref={footerRef}>
            {renderFooter}
          </div>
          {isMouseHover && !isDraggingActive && (
            <div
              css={applyDashedLineStyle(false, true, false, footerMaxHeight)}
            />
          )}
        </Resizable>
      )}
    </div>
  )
}

FormWidget.displayName = "FormWidget"
