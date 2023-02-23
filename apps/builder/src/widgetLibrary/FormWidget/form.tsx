import { get, isEqual, set } from "lodash"
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
import { useMessage } from "@illa-design/react"
import { ReactComponent as ResizeBar } from "@/assets/resizeBar.svg"
import {
  DragInfo,
  DropResultInfo,
} from "@/page/App/components/DotPanel/interface"
import {
  applyDashedLineStyle,
  applyXDirectionDashedLineStyle,
} from "@/page/App/components/ScaleSquare/style"
import { BUILDER_CALC_CONTEXT } from "@/page/App/context/globalDataProvider"
import { getIsILLAEditMode } from "@/redux/config/configSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { isObject } from "@/utils/typeHelper"
import { BasicContainer } from "../BasicContainer/BasicContainer"
import { FormWidgetProps } from "./interface"
import {
  formBodyStyle,
  formContainerStyle,
  formHeaderStyle,
  resizeBarStyle,
  resizeLineStyle,
} from "./style"
import {
  FORM_BODY_MARGIN,
  FORM_BODY_MIN_HEIGHT,
  FORM_CAN_BIND_WIDGET_TYPE,
  FORM_MIN_FOOTER_HEIGHT_ROW_NUMBER,
  FORM_MIN_HEADER_HEIGHT_ROW_NUMBER,
} from "./widgetConfig"

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

// function getAllChildrenNode(
//   componentNode: ComponentNode,
//   displayNames: string[],
// ) {
//   if (componentNode.containerType !== "EDITOR_DOT_PANEL") {
//     displayNames.push(componentNode.displayName)
//     if (Array.isArray(componentNode.childrenNode)) {
//       componentNode.childrenNode.forEach((node) => {
//         getAllChildrenNode(node, displayNames)
//       })
//     }
//   } else {
//     if (Array.isArray(componentNode.childrenNode)) {
//       componentNode.childrenNode.forEach((node) => {
//         getAllChildrenNode(node, displayNames)
//       })
//     }
//   }
// }
interface DragCollection {
  isDraggingActive: boolean
}

export const FormWidget: FC<FormWidgetProps> = (props) => {
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
    blockColumns,
    formData: propsFormData,
    handleUpdateOriginalDSLMultiAttr,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    handleUpdateMultiExecutionResult,
    triggerEventHandler,
  } = props

  const message = useMessage()
  const [bodyRef, bodyBounds] = useMeasure()
  const [headerRef, headerBounds] = useMeasure()
  const [footerRef, footerBounds] = useMeasure()
  const [containerRef, containerBounds] = useMeasure()
  const prevDisabled = useRef<boolean>(disabled)
  const containerNodeRef = useRef<HTMLDivElement>(
    null,
  ) as MutableRefObject<HTMLDivElement | null>
  const [isMouseHover, setIsMouseHover] = useState(false)
  const isEditMode = useSelector(getIsILLAEditMode)
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

  const allLikeInputChildrenNodeRealProps = useMemo(() => {
    return allLikeInputChildrenNodeDisplayName.map((name) => {
      const widgetProps = get(executionResult, name, {})
      return {
        displayName: name,
        ...widgetProps,
      }
    })
  }, [allLikeInputChildrenNodeDisplayName, executionResult])

  const formDataKeyMapProps = useMemo(() => {
    const map: Record<string, any> = {}
    allLikeInputChildrenNodeRealProps.forEach((prop) => {
      set(map, prop.formDataKey || prop.displayName, prop)
    })
    return map
  }, [allLikeInputChildrenNodeRealProps])

  const formData = useMemo(() => {
    const data: Record<string, any> = {}
    allLikeInputChildrenNodeRealProps.forEach((prop) => {
      set(data, prop.formDataKey || prop.displayName, prop.value)
    })
    return data
  }, [allLikeInputChildrenNodeRealProps])

  useEffect(() => {
    if (!isEqual(formData, propsFormData)) {
      handleUpdateMultiExecutionResult?.([
        {
          displayName,
          value: {
            formData: formData,
          },
        },
      ])
    }
  }, [
    dispatch,
    displayName,
    formData,
    handleUpdateMultiExecutionResult,
    propsFormData,
  ])

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

  const handleOnInvalid = useCallback(() => {
    triggerEventHandler("invalid")
  }, [triggerEventHandler])

  const handleOnValidate = useCallback(() => {
    allLikeInputChildrenNode.forEach((node) => {
      try {
        return evaluateDynamicString(
          "events",
          `{{${node.displayName}.validate()}}`,
          BUILDER_CALC_CONTEXT,
        )
      } catch (e) {
        message.error({
          content: "eventHandler run error",
        })
        return false
      }
    })
  }, [allLikeInputChildrenNode, message])

  const handleSetValue = useCallback(
    (value: Record<string, any>) => {
      const keys = Object.keys(value)
      const updateSlice: {
        displayName: string
        value: {
          value: string
        }
      }[] = []

      keys.forEach((key) => {
        const realDisplayName = get(formDataKeyMapProps, key, null)
        if (realDisplayName) {
          updateSlice.push({
            displayName: key,
            value: {
              value: value[key],
            },
          })
        }
      })
      if (updateSlice.length > 0) {
        handleUpdateMultiExecutionResult?.(updateSlice)
      }
    },
    [formDataKeyMapProps, handleUpdateMultiExecutionResult],
  )

  const handleOnReset = useCallback(() => {
    const allUpdate = allLikeInputChildrenNode.map((node) => {
      return {
        displayName: node.displayName,
        value: {
          value: "",
          validateMessage: "",
        },
      }
    })
    handleUpdateMultiExecutionResult?.(allUpdate)
  }, [allLikeInputChildrenNode, handleUpdateMultiExecutionResult])

  const handleOnSubmit = useCallback(() => {
    if (disabledSubmit || disabled) return
    if (validateInputsOnSubmit) {
      const validateResult = allLikeInputChildrenNode.every((node) => {
        try {
          const validateFunc = get(
            BUILDER_CALC_CONTEXT,
            `${node.displayName}.validate`,
          ) as unknown
          if (typeof validateFunc === "function") {
            return !validateFunc()
          }
          return false
        } catch (e) {
          message.error({
            content: "eventHandler run error",
          })
          return false
        }
      })
      if (!validateResult) {
        handleOnInvalid()
        return
      }
    }
    triggerEventHandler("submit")
    if (resetAfterSuccessful) {
      handleOnReset()
    }
  }, [
    allLikeInputChildrenNode,
    disabled,
    disabledSubmit,
    handleOnInvalid,
    handleOnReset,
    message,
    resetAfterSuccessful,
    triggerEventHandler,
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
    handleUpdateGlobalData,
    handleOnReset,
    handleOnValidate,
    handleSetValue,
    handleOnSubmit,
    handleOnInvalid,
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
        addedRowNumber={0}
        blockColumns={blockColumns}
      />
    )
  }, [blockColumns, childrenNode, headerBounds.height])

  const renderBody = useMemo(() => {
    const bodyComponentNode = childrenNode[1]
    return (
      <BasicContainer
        componentNode={bodyComponentNode}
        minHeight={bodyBounds.height - 2 * 8}
        padding={8}
        safeRowNumber={1}
        addedRowNumber={20}
        blockColumns={blockColumns}
      />
    )
  }, [blockColumns, bodyBounds.height, childrenNode])

  const renderFooter = useMemo(() => {
    const footerComponentNode = childrenNode[2]
    return (
      <BasicContainer
        componentNode={footerComponentNode}
        canResizeY={false}
        minHeight={footerBounds.height - 2 * 8}
        padding={8}
        addedRowNumber={0}
        blockColumns={blockColumns}
      />
    )
  }, [blockColumns, childrenNode, footerBounds.height])

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
      drop: (dropInfo) => {
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
          isDropOnCanvas: true,
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
            isEditMode && isMouseHover && !isDraggingActive
              ? resizeTopHandler
              : undefined
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
          {isMouseHover && !isDraggingActive && isEditMode && (
            <div css={applyDashedLineStyle(false, true, false)} />
          )}
        </Resizable>
      )}
      <div css={formBodyStyle} ref={bodyRef}>
        {renderBody}
        {isMouseHover && !isDraggingActive && isEditMode && (
          <div css={applyXDirectionDashedLineStyle(false, true, false)} />
        )}
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
            isEditMode && isMouseHover && !isDraggingActive
              ? resizeBottomHandler
              : undefined
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
          {isMouseHover && !isDraggingActive && isEditMode && (
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
