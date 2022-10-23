import {
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
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
  FORM_CAN_BIND_WIDGET_TYPE,
} from "./widgetConfig"
import { ReactComponent as ResizeBar } from "@/assets/resizeBar.svg"
import { useDrop } from "react-dnd"
import {
  DragInfo,
  DropResultInfo,
} from "@/page/App/components/DotPanel/interface"
import { useDispatch, useSelector } from "react-redux"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { BUILDER_CALC_CONTEXT } from "@/page/App/context/globalDataProvider"
import { Message } from "@illa-design/react"
import { isObject } from "../../utils/typeHelper"

function getLikeInputChildrenNode(
  componentNode: ComponentNode,
  componentNodeResult: ComponentNode[],
  hasForm: boolean,
) {
  if (
    (componentNode.containerType !== "EDITOR_DOT_PANEL" &&
      FORM_CAN_BIND_WIDGET_TYPE.has(componentNode.type)) ||
    (hasForm && componentNode.type === "FORM_WIDGET")
  ) {
    componentNodeResult.push(componentNode)
    if (Array.isArray(componentNode.childrenNode)) {
      componentNode.childrenNode.forEach((node) => {
        getLikeInputChildrenNode(node, componentNodeResult, hasForm)
      })
    }
  } else {
    if (Array.isArray(componentNode.childrenNode)) {
      componentNode.childrenNode.forEach((node) => {
        getLikeInputChildrenNode(node, componentNodeResult, hasForm)
      })
    }
  }
}

function getAllChildrenNode(
  componentNode: ComponentNode,
  displayNames: string[],
) {
  if (componentNode.containerType !== "EDITOR_DOT_PANEL") {
    displayNames.push(componentNode.displayName)
    if (Array.isArray(componentNode.childrenNode)) {
      componentNode.childrenNode.forEach((node) => {
        getAllChildrenNode(node, displayNames)
      })
    }
  } else {
    if (Array.isArray(componentNode.childrenNode)) {
      componentNode.childrenNode.forEach((node) => {
        getAllChildrenNode(node, displayNames)
      })
    }
  }
}
interface DragCollection {
  isDraggingActive: boolean
}

export const FormWidget: FC<FormWIdgetProps> = (props) => {
  const {
    childrenNode,
    showFooter,
    showHeader,
    headerHeight,
    footerHeight,
    unitH,
    disabled,
    displayName,
    disabledSubmit,
    resetAfterSuccessful,
    validateInputsOnSubmit,
    handleUpdateOriginalDSLMultiAttr,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
  } = props

  const [bodyRef, bodyBounds] = useMeasure()
  const [headerRef, headerBounds] = useMeasure()
  const [footerRef, footerBounds] = useMeasure()
  const [containerRef, containerBounds] = useMeasure()
  const prevDisabled = useRef<boolean>(disabled)
  const containerNodeRef = useRef<HTMLDivElement>(
    null,
  ) as MutableRefObject<HTMLDivElement | null>
  const [isMouseHover, setIsMouseHover] = useState(false)
  const executionResult = useSelector(getExecutionResult)

  const dispatch = useDispatch()

  const allLikeInputWithFormChildrenNode = useMemo(() => {
    let componentNodeResult: ComponentNode[] = []
    childrenNode.forEach((node) => {
      getLikeInputChildrenNode(node, componentNodeResult, true)
    })
    return componentNodeResult
  }, [childrenNode])

  const allLikeInputWithFormChildrenNodeDisplayName = useMemo(() => {
    return allLikeInputWithFormChildrenNode.map((node) => node.displayName)
  }, [allLikeInputWithFormChildrenNode])

  const allLikeInputChildrenNode = useMemo(() => {
    let componentNodeResult: ComponentNode[] = []
    childrenNode.forEach((node) => {
      getLikeInputChildrenNode(node, componentNodeResult, false)
    })
    return componentNodeResult
  }, [childrenNode])

  const allLikeInputChildrenNodeDisplayName = useMemo(() => {
    return allLikeInputChildrenNode.map((node) => node.displayName)
  }, [allLikeInputChildrenNode])

  useEffect(() => {
    if (prevDisabled.current !== disabled) {
      const updateArray = allLikeInputWithFormChildrenNodeDisplayName.map(
        (displayName) => {
          return {
            displayName,
            updateSlice: {
              disabled:
                typeof disabled === "undefined" ? "" : `{{${disabled}}}`,
            },
          }
        },
      )
      dispatch(componentsActions.updateMultiComponentPropsReducer(updateArray))
    }
    prevDisabled.current = disabled
  }, [
    disabled,
    childrenNode,
    allLikeInputWithFormChildrenNodeDisplayName,
    dispatch,
  ])

  const handleOnInvalid = useCallback(() => {}, [])

  const handleOnValidate = useCallback(() => {
    console.log("????validate")
    allLikeInputChildrenNode.forEach((node) => {
      try {
        return evaluateDynamicString(
          "events",
          `{{${node.displayName}.validate()}}`,
          BUILDER_CALC_CONTEXT,
        )
      } catch (e) {
        Message.error("eventHandler run error")
        return false
      }
    })
  }, [allLikeInputChildrenNode])

  const handleSetValue = useCallback(
    (value: Record<string, any>) => {
      const keys = Object.keys(value)
      const updateSlice = keys.map((key) => {
        return {
          displayName: key,
          value: {
            value: value[key],
          },
        }
      })
      dispatch(
        executionActions.updateExecutionByMultiDisplayNameReducer(updateSlice),
      )
    },
    [dispatch],
  )

  const handleOnReset = useCallback(() => {
    const allUpdate = allLikeInputChildrenNode.map((node) => {
      return {
        displayName: node.displayName,
        value: {
          value: "",
        },
      }
    })
    dispatch(
      executionActions.updateExecutionByMultiDisplayNameReducer(allUpdate),
    )
  }, [allLikeInputChildrenNode, dispatch])

  const handleOnSubmit = useCallback(() => {
    console.log("resetAfterSuccessful", resetAfterSuccessful)
    if (disabledSubmit || disabled) return
    if (validateInputsOnSubmit) {
      const validateResult = allLikeInputChildrenNode.every((node) => {
        try {
          return evaluateDynamicString(
            "events",
            `{{${node.displayName}.validate()}}`,
            BUILDER_CALC_CONTEXT,
          )
        } catch (e) {
          Message.error("eventHandler run error")
          return false
        }
      })
      console.log("validateResult", validateResult)
      if (!validateResult) {
        handleOnInvalid()
        return
      }
    }
    if (resetAfterSuccessful) {
      console.log("reset")
      handleOnReset()
    }
  }, [
    allLikeInputChildrenNode,
    disabled,
    disabledSubmit,
    handleOnInvalid,
    handleOnReset,
    resetAfterSuccessful,
    validateInputsOnSubmit,
  ])

  useEffect(() => {
    handleUpdateGlobalData?.(displayName, {
      submit: handleOnSubmit,
      invalid: handleOnInvalid,
      reset: handleOnReset,
      setValue: (value: Record<string, any>) => {
        if (isObject(value)) {
          handleSetValue(value)
        }
      },
      validate: handleOnValidate,
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
    handleDeleteGlobalData,
    handleOnSubmit,
    handleOnInvalid,
    handleUpdateGlobalData,
    handleOnReset,
    handleOnValidate,
    handleSetValue,
  ])

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
        minHeight={headerBounds.height - 16}
        padding={8}
      />
    )
  }, [childrenNode, headerBounds.height])

  const renderBody = useMemo(() => {
    const bodyComponentNode = childrenNode[1]
    return (
      <BasicContainer
        componentNode={bodyComponentNode}
        minHeight={bodyBounds.height - 16}
        padding={8}
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
        padding={8}
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

  const [{ isDraggingActive }, dropRef] = useDrop<
    DragInfo,
    DropResultInfo,
    DragCollection
  >(
    () => ({
      accept: ["components"],
      hover: (dragInfo, monitor) => {
        if (monitor.isOver({ shallow: true })) {
        }
      },
      drop: (dropInfo, monitor) => {
        const { item } = dropInfo
        if (disabled) {
          const updateSlice = {
            disabled: "{{true}}",
          }
          dispatch(
            componentsActions.updateComponentPropsReducer({
              displayName: item.displayName,
              updateSlice,
            }),
          )
        }
        return {
          isDropOnCanvas: false,
        }
      },
      collect: (monitor) => {
        return {
          isDraggingActive: monitor.isOver(),
        }
      },
    }),
    [disabled],
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
