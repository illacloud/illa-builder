import { ComponentMapNode } from "@illa-public/public-types"
import { get, isEqual, set } from "lodash-es"
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
import ResizeBar from "@/assets/resizeBar.svg?react"
import { DropResultInfo } from "@/page/App/components/DotPanel/components/Canvas/interface"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import { DragInfo } from "@/page/App/components/ScaleSquare/components/DragContainer/interface"
import {
  applyDashedLineStyle,
  applyXDirectionDashedLineStyle,
} from "@/page/App/components/ScaleSquare/style"
import { getIsILLAEditMode } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getComponentMap } from "@/redux/currentApp/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { ILLAEditorRuntimePropsCollectorInstance } from "@/utils/executionTreeHelper/runtimePropsCollector"
import { isObject } from "@/utils/typeHelper"
import RenderChildrenCanvas from "../PublicSector/RenderChildrenCanvas"
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
  componentNodeDisplayName: string,
  componentNodeResult: ComponentMapNode[],
  components: Record<string, ComponentMapNode>,
  hasForm: boolean,
) {
  const componentNode = components[componentNodeDisplayName]
  if (
    (componentNode.containerType !== "EDITOR_DOT_PANEL" &&
      FORM_CAN_BIND_WIDGET_TYPE.has(componentNode.type)) ||
    (hasForm && componentNode.type === "FORM_WIDGET")
  ) {
    componentNodeResult.push(componentNode)
    if (Array.isArray(componentNode.childrenNode)) {
      componentNode.childrenNode.forEach((childDisplayName) => {
        getLikeInputChildrenNode(
          childDisplayName,
          componentNodeResult,
          components,
          hasForm,
        )
      })
    }
  } else {
    if (Array.isArray(componentNode.childrenNode)) {
      componentNode.childrenNode.forEach((childDisplayName) => {
        getLikeInputChildrenNode(
          childDisplayName,
          componentNodeResult,
          components,
          hasForm,
        )
      })
    }
  }
}

interface DragCollection {
  isDraggingActive: boolean
}

export const FormWidget: FC<FormWidgetProps> = (props) => {
  const {
    childrenNode: childrenNodeDisplayNames,
    showFooter,
    showHeader,
    headerHeight,
    footerHeight,
    disabled,
    displayName,
    disabledSubmit,
    resetAfterSuccessful,
    validateInputsOnSubmit,
    columnNumber,
    formData: propsFormData,
    dynamicHeight = "fixed",
    padding,
    handleUpdateOriginalDSLMultiAttr,
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
    handleUpdateMultiExecutionResult,
    triggerEventHandler,
  } = props

  const message = useMessage()
  const [containerRef, containerBounds] = useMeasure()
  const prevDisabled = useRef<boolean>(disabled)
  const containerNodeRef = useRef<HTMLDivElement>(
    null,
  ) as MutableRefObject<HTMLDivElement | null>
  const [isMouseHover, setIsMouseHover] = useState(false)
  const isEditMode = useSelector(getIsILLAEditMode)
  const executionResult = useSelector(getExecutionResult)
  const components = useSelector(getComponentMap)

  const dispatch = useDispatch()

  const allLikeInputWithFormChildrenNodeDisplayName = useMemo(() => {
    let componentNodeResult: ComponentMapNode[] = []
    childrenNodeDisplayNames.forEach((node) => {
      getLikeInputChildrenNode(node, componentNodeResult, components, true)
    })
    return componentNodeResult.map((node) => node.displayName)
  }, [childrenNodeDisplayNames, components])

  const allLikeInputChildrenNode = useMemo(() => {
    let componentNodeResult: ComponentMapNode[] = []
    childrenNodeDisplayNames.forEach((node) => {
      getLikeInputChildrenNode(node, componentNodeResult, components, false)
    })
    return componentNodeResult
  }, [childrenNodeDisplayNames, components])

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
    childrenNodeDisplayNames,
    allLikeInputWithFormChildrenNodeDisplayName,
    dispatch,
  ])

  const handleOnInvalid = useCallback(() => {
    triggerEventHandler("invalid")
  }, [triggerEventHandler])

  const handleOnValidate = useCallback(() => {
    const finalContext =
      ILLAEditorRuntimePropsCollectorInstance.getCurrentPageCalcContext()
    allLikeInputChildrenNode.forEach((node) => {
      try {
        return evaluateDynamicString(
          "events",
          `{{${node.displayName}.validate()}}`,
          finalContext,
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
          value: node.props!.value,
          validateMessage: "",
        },
      }
    })
    handleUpdateMultiExecutionResult?.(allUpdate)
  }, [allLikeInputChildrenNode, handleUpdateMultiExecutionResult])

  const handleOnSubmit = useCallback(() => {
    if (disabledSubmit || disabled) return
    if (validateInputsOnSubmit) {
      const finalContext =
        ILLAEditorRuntimePropsCollectorInstance.getCurrentPageCalcContext()
      const validateResult = allLikeInputChildrenNode.every((node) => {
        try {
          const validateFunc = get(
            finalContext,
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
    updateComponentRuntimeProps({
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
      deleteComponentRuntimeProps()
    }
  }, [
    deleteComponentRuntimeProps,
    handleOnInvalid,
    handleOnReset,
    handleOnSubmit,
    handleOnValidate,
    handleSetValue,
    updateComponentRuntimeProps,
  ])

  const headerMinHeight = useMemo(
    () => FORM_MIN_HEADER_HEIGHT_ROW_NUMBER * UNIT_HEIGHT,
    [],
  )
  const footerMinHeight = useMemo(
    () => FORM_MIN_FOOTER_HEIGHT_ROW_NUMBER * UNIT_HEIGHT,
    [],
  )

  const headerMaxHeight = useMemo(() => {
    return (
      Math.floor(
        (containerBounds.height -
          (FORM_BODY_MIN_HEIGHT + 2 * FORM_BODY_MARGIN) -
          footerHeight * UNIT_HEIGHT) /
          UNIT_HEIGHT,
      ) * UNIT_HEIGHT
    )
  }, [containerBounds.height, footerHeight])

  const footerMaxHeight = useMemo(() => {
    return (
      Math.floor(
        (containerBounds.height -
          (FORM_BODY_MIN_HEIGHT + 2 * FORM_BODY_MARGIN) -
          headerHeight * UNIT_HEIGHT) /
          UNIT_HEIGHT,
      ) * UNIT_HEIGHT
    )
  }, [containerBounds.height, headerHeight])

  const handleUpdateHeight = useCallback((_height: number) => {
    // TODO: update height
  }, [])

  const canResizeCanvas = dynamicHeight !== "fixed"

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
    dispatch(
      configActions.setResizingNodeIDsReducer([
        `${displayName}-resize-form-header`,
      ]),
    )
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
      dispatch(configActions.setResizingNodeIDsReducer([]))
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
      dispatch(configActions.setResizingNodeIDsReducer([]))
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
      hover: (dragInfo, monitor) => {
        if (monitor.isOver({ shallow: true })) {
        }
      },
      drop: (dropInfo) => {
        const { draggedComponents } = dropInfo
        const drageedDisplayNames = draggedComponents.map(
          (component) => component.displayName,
        )
        if (disabled) {
          const updateSlice = {
            disabled: "{{true}}",
          }
          const MultiUpdateSlice = drageedDisplayNames.map((displayName) => {
            return {
              displayName,
              updateSlice,
            }
          })
          dispatch(
            componentsActions.updateMultiComponentPropsReducer(
              MultiUpdateSlice,
            ),
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
            height: headerHeight * UNIT_HEIGHT,
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
          <div css={formHeaderStyle}>
            <RenderChildrenCanvas
              displayName={childrenNodeDisplayNames[0]}
              columnNumber={columnNumber}
              handleUpdateHeight={handleUpdateHeight}
              canResizeCanvas={canResizeCanvas}
              containerPadding={padding?.size}
            />
          </div>
          {isMouseHover && !isDraggingActive && isEditMode && (
            <div css={applyDashedLineStyle(false, true, false)} />
          )}
        </Resizable>
      )}
      <div css={formBodyStyle}>
        <RenderChildrenCanvas
          displayName={childrenNodeDisplayNames[1]}
          columnNumber={columnNumber}
          handleUpdateHeight={handleUpdateHeight}
          canResizeCanvas={canResizeCanvas}
          containerPadding={padding?.size}
        />
        {isMouseHover && !isDraggingActive && isEditMode && (
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
          <div css={formHeaderStyle}>
            <RenderChildrenCanvas
              displayName={childrenNodeDisplayNames[2]}
              columnNumber={columnNumber}
              handleUpdateHeight={handleUpdateHeight}
              canResizeCanvas={canResizeCanvas}
              containerPadding={padding?.size}
            />
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
export default FormWidget
