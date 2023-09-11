import { chunk, cloneDeep, get, isEqual, set, toPath } from "lodash"
import { Resizable, ResizeCallback, ResizeStartCallback } from "re-resizable"
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useMeasure from "react-use-measure"
import { Pagination } from "@illa-design/react"
import { RenderComponentCanvasWithJson } from "@/page/App/components/DotPanel/components/Canvas/renderComponentCanvasContainerWithJson"
import {
  LIKE_CONTAINER_WIDGET_PADDING,
  LIST_ITEM_MARGIN_TOP,
  WIDGET_SCALE_SQUARE_BORDER_WIDTH,
} from "@/page/App/components/ScaleSquare/constant/widget"
import {
  applyBarHandlerStyle,
  applyBarPointerStyle,
  applyDashedLineStyle,
} from "@/page/App/components/ScaleSquare/style"
import { getIsILLAEditMode } from "@/redux/config/configSelector"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import {
  getExecutionResult,
  getRawTree,
} from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import store from "@/store"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { convertPathToString } from "@/utils/executionTreeHelper/utils"
import { isObject } from "@/utils/typeHelper"
import { VALIDATION_TYPES, validationFactory } from "@/utils/validationFactory"
import {
  ListWidgetProps,
  ListWidgetPropsWithChildrenNodes,
  OVERFLOW_TYPE,
  RenderCopyContainerProps,
  RenderTemplateContainerProps,
} from "@/widgetLibrary/ListWidget/interface"
import {
  ListParentContainerWithScroll,
  applyListItemStyle,
  listContainerStyle,
  listParentContainerWithPagination,
  paginationWrapperStyle,
} from "@/widgetLibrary/ListWidget/style"
import { RenderChildrenCanvas } from "../PublicSector/RenderChildrenCanvas"

const RenderTemplateContainer: FC<RenderTemplateContainerProps> = (props) => {
  const {
    templateComponentNodes,
    columnNumber,
    dynamicHeight,
    templateContainerHeight,
    handleUpdateOriginalDSLMultiAttr,
    updateComponentHeight,
    itemNumber = 1,
  } = props

  const enableAutoHeight = dynamicHeight !== "fixed"

  const handleUpdateHeight = useCallback(
    (height: number) => {
      if (!updateComponentHeight) return
      if (
        height + 2 * WIDGET_SCALE_SQUARE_BORDER_WIDTH !==
        templateContainerHeight
      ) {
        handleUpdateOriginalDSLMultiAttr(
          {
            itemHeight: height + 2 * WIDGET_SCALE_SQUARE_BORDER_WIDTH,
          },
          true,
        )
      }
      updateComponentHeight(
        height +
          2 * WIDGET_SCALE_SQUARE_BORDER_WIDTH +
          (height +
            2 * WIDGET_SCALE_SQUARE_BORDER_WIDTH +
            LIST_ITEM_MARGIN_TOP) *
            (itemNumber - 1),
      )
    },
    [
      handleUpdateOriginalDSLMultiAttr,
      itemNumber,
      templateContainerHeight,
      updateComponentHeight,
    ],
  )

  return (
    <RenderChildrenCanvas
      currentComponentNode={templateComponentNodes}
      columnNumber={columnNumber}
      handleUpdateHeight={handleUpdateHeight}
      canResizeCanvas={enableAutoHeight}
    />
  )
}

const RenderCopyContainer: FC<RenderCopyContainerProps> = (props) => {
  const {
    templateComponentNodes,
    templateContainerHeight: _templateContainerHeight,
    columnNumber,
    displayNamePrefix,
  } = props
  return templateComponentNodes ? (
    <RenderComponentCanvasWithJson
      componentNode={templateComponentNodes}
      containerPadding={LIKE_CONTAINER_WIDGET_PADDING}
      columnNumber={columnNumber}
      displayNamePrefix={displayNamePrefix}
    />
  ) : null
}

const resizeBottomHandler = () => {
  const rootState = store.getState()
  const isEditMode = getIsILLAEditMode(rootState)
  const scaleSquareState = !isEditMode ? "production" : "normal"
  return {
    bottom: (
      <div css={applyBarHandlerStyle(true, scaleSquareState, "b")}>
        <div
          className="handler"
          css={applyBarPointerStyle(true, scaleSquareState, "b")}
        />
      </div>
    ),
  }
}

export const ListWidgetWithPagination: FC<ListWidgetPropsWithChildrenNodes> = (
  props,
) => {
  const {
    dataSources,
    itemHeight = 48,
    displayName,
    currentPage,
    childrenNode,
    handleUpdateMultiExecutionResult,
    handleUpdateOriginalDSLMultiAttr,
    copyComponents,
    pageSize,
    handleUpdateSelectedItem,
    itemBackGroundColor,
    columnNumber,
    dynamicHeight = "fixed",
    h,
  } = props
  const [containerRef, containerBounds] = useMeasure()
  const [isMouseHover, setIsMouseHover] = useState(false)
  const isEditMode = useSelector(getIsILLAEditMode)
  const dispatch = useDispatch()

  const itemNumber = useMemo(() => {
    return (
      pageSize ||
      Math.floor(containerBounds.height / itemHeight) ||
      dataSources?.length
    )
  }, [containerBounds.height, dataSources?.length, itemHeight, pageSize])

  const handleChangeCurrentPage = useCallback(
    (pageNumber: number) => {
      handleUpdateMultiExecutionResult([
        {
          displayName,
          value: {
            currentPage: pageNumber,
          },
        },
      ])
    },
    [displayName, handleUpdateMultiExecutionResult],
  )

  const currentData = useMemo(() => {
    const chunkData = chunk(copyComponents, itemNumber)
    if (chunkData.length === 0) return []
    return currentPage < chunkData.length
      ? chunkData[currentPage]
      : chunkData[0]
  }, [copyComponents, currentPage, itemNumber])

  const handleResizeStart: ResizeStartCallback = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(executionActions.setResizingNodeIDsReducer([displayName]))
  }

  const handleOnResizeTopStop: ResizeCallback = useCallback(
    (e, dir, elementRef, delta) => {
      const { height } = delta
      let finalHeight = itemHeight + height
      handleUpdateOriginalDSLMultiAttr({
        itemHeight: finalHeight,
      })
      dispatch(executionActions.setResizingNodeIDsReducer([]))
    },
    [dispatch, handleUpdateOriginalDSLMultiAttr, itemHeight],
  )

  const canShowBorder = isEditMode && isMouseHover

  return (
    <div
      css={listParentContainerWithPagination}
      onMouseEnter={() => {
        setIsMouseHover(true)
      }}
      onMouseLeave={() => {
        setIsMouseHover(false)
      }}
    >
      <div css={listContainerStyle} ref={containerRef}>
        <Resizable
          size={{
            width: "100%",
            height: itemHeight,
          }}
          key={childrenNode[0].displayName}
          bounds="parent"
          minHeight={48}
          maxHeight={
            dynamicHeight !== "fixed" ? "unset" : containerBounds.height - 4
          }
          handleComponent={isMouseHover ? resizeBottomHandler() : undefined}
          enable={
            dynamicHeight !== "fixed"
              ? {}
              : {
                  bottom: true,
                }
          }
          onResizeStart={handleResizeStart}
          onResizeStop={handleOnResizeTopStop}
        >
          <div
            css={applyListItemStyle(
              true,
              canShowBorder,
              itemBackGroundColor,
              isEditMode,
            )}
            onClick={() => {
              handleUpdateSelectedItem(0)
            }}
          >
            <RenderTemplateContainer
              templateComponentNodes={childrenNode[0]}
              templateContainerHeight={itemHeight}
              columnNumber={columnNumber}
              dynamicHeight={dynamicHeight}
              handleUpdateOriginalDSLMultiAttr={
                handleUpdateOriginalDSLMultiAttr
              }
              h={h}
            />
          </div>
          {canShowBorder && (
            <div css={applyDashedLineStyle(false, true, false)} />
          )}
        </Resizable>
        {currentData.map((node, index) => {
          if (!currentPage && index === 0) {
            return null
          }
          return (
            <div
              css={applyListItemStyle(
                false,
                canShowBorder,
                itemBackGroundColor,
                isEditMode,
                itemHeight,
              )}
              key={node.displayName}
              onClick={() => {
                handleUpdateSelectedItem(index)
              }}
            >
              <RenderCopyContainer
                templateComponentNodes={node}
                templateContainerHeight={itemHeight}
                columnNumber={columnNumber}
                displayNamePrefix={`list-child-${index}-`}
              />
            </div>
          )
        })}
      </div>
      <div css={paginationWrapperStyle}>
        <Pagination
          total={dataSources?.length}
          current={currentPage}
          pageSize={itemNumber}
          size="medium"
          sizeCanChange={false}
          hideOnSinglePage={false}
          simple
          onChange={handleChangeCurrentPage}
        />
      </div>
    </div>
  )
}

export const ListWidgetWithScroll: FC<ListWidgetPropsWithChildrenNodes> = (
  props,
) => {
  const {
    itemHeight = 48,
    handleUpdateOriginalDSLMultiAttr,
    childrenNode,
    copyComponents = [],
    handleUpdateSelectedItem,
    itemBackGroundColor,
    columnNumber,
    dynamicHeight,
    updateComponentHeight,
    h,
    dynamicMinHeight,
    dynamicMaxHeight,
    displayName,
  } = props
  const [containerRef, containerBounds] = useMeasure()
  const [isMouseHover, setIsMouseHover] = useState(false)
  const isEditMode = useSelector(getIsILLAEditMode)
  const dispatch = useDispatch()

  const propsRef = useRef(props)

  useEffect(() => {
    if (!isEqual(propsRef.current, props)) {
      propsRef.current = props
    }
  }, [props])

  const handleResizeStart: ResizeStartCallback = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(executionActions.setResizingNodeIDsReducer([displayName]))
  }

  const handleOnResizeTopStop: ResizeCallback = useCallback(
    (e, dir, elementRef, delta) => {
      let finalHeight = itemHeight + delta.height
      handleUpdateOriginalDSLMultiAttr({
        itemHeight: finalHeight,
      })
      dispatch(executionActions.setResizingNodeIDsReducer([]))
    },
    [dispatch, handleUpdateOriginalDSLMultiAttr, itemHeight],
  )

  const canShowBorder = isEditMode && isMouseHover
  return (
    <div
      css={ListParentContainerWithScroll}
      ref={containerRef}
      onMouseEnter={() => {
        setIsMouseHover(true)
      }}
      onMouseLeave={() => {
        setIsMouseHover(false)
      }}
    >
      <Resizable
        size={{
          width: "100%",
          height: itemHeight,
        }}
        bounds="parent"
        minHeight={48}
        maxHeight={
          dynamicHeight !== "fixed" ? "unset" : containerBounds.height - 4
        }
        handleComponent={isMouseHover ? resizeBottomHandler() : undefined}
        enable={
          dynamicHeight !== "fixed"
            ? {}
            : {
                bottom: true,
              }
        }
        onResizeStart={handleResizeStart}
        onResizeStop={handleOnResizeTopStop}
      >
        <div
          css={applyListItemStyle(
            true,
            canShowBorder,
            itemBackGroundColor,
            isEditMode,
          )}
          onClick={() => {
            handleUpdateSelectedItem(0)
          }}
        >
          <RenderTemplateContainer
            templateComponentNodes={childrenNode[0]}
            templateContainerHeight={itemHeight}
            columnNumber={columnNumber}
            dynamicHeight={dynamicHeight}
            handleUpdateOriginalDSLMultiAttr={handleUpdateOriginalDSLMultiAttr}
            itemNumber={copyComponents?.length}
            updateComponentHeight={updateComponentHeight}
            h={h}
            dynamicMinHeight={dynamicMinHeight}
            dynamicMaxHeight={dynamicMaxHeight}
          />
        </div>
        {canShowBorder && (
          <div css={applyDashedLineStyle(false, true, false)} />
        )}
      </Resizable>
      {copyComponents?.map((node, index) => {
        if (index === 0) return null
        return (
          <div
            css={applyListItemStyle(
              false,
              canShowBorder,
              itemBackGroundColor,
              isEditMode,
              itemHeight,
            )}
            key={node.displayName}
            onClick={() => {
              handleUpdateSelectedItem(index)
            }}
          >
            <RenderCopyContainer
              templateComponentNodes={node}
              templateContainerHeight={itemHeight}
              columnNumber={columnNumber}
              displayNamePrefix={`list-child-${index}-`}
            />
          </div>
        )
      })}
    </div>
  )
}

export const ListWidget: FC<ListWidgetProps> = (props) => {
  const {
    overflowMethod,
    displayName,
    dataSources,
    childrenNode,
    handleUpdateMultiExecutionResult,
    triggerEventHandler,
    disabled,
    dynamicHeight,
  } = props

  const propsRef = useRef(props)
  const executionResult = useSelector(getExecutionResult)
  const rawTree = useSelector(getRawTree)

  const prevDataSourcesRef = useRef(dataSources)

  useEffect(() => {
    if (!isEqual(propsRef.current, props)) {
      propsRef.current = props
    }
  }, [props])

  const updateTemplateContainerNodesProps = useCallback(
    (childrenNodes: ComponentNode[]) => {
      return childrenNodes.map((itemContainer, index) => {
        const currentItemContainer = cloneDeep(itemContainer)
        const currentItems = currentItemContainer.childrenNode
        if (Array.isArray(currentItems) && currentItems.length > 0) {
          let newCurrentItems = currentItems.map((currentItem) => {
            if (
              currentItem.props &&
              Array.isArray(currentItem.props.$dynamicAttrPaths)
            ) {
              const { displayName } = currentItem
              const { $dynamicAttrPaths } = currentItem.props
              $dynamicAttrPaths.forEach((path) => {
                const finalPath = convertPathToString(toPath(path))
                const requireEvalString = get(currentItem.props, finalPath, "")
                let evalResult: unknown
                try {
                  evalResult = evaluateDynamicString(
                    "",
                    requireEvalString,
                    executionResult,
                  )
                } catch (e) {
                  console.log(e)
                  evalResult = ""
                }
                let value = evalResult
                if (Array.isArray(evalResult) && evalResult.length > index) {
                  const rawWidget = rawTree[displayName]
                  if (rawWidget && isObject(rawWidget.$validationPaths)) {
                    const validationPaths = rawWidget.$validationPaths
                    const validationType = validationPaths[finalPath]
                    if (validationType === VALIDATION_TYPES.ARRAY) {
                      const validationFunc = validationFactory[validationType]
                      const res = validationFunc?.(evalResult, "")
                      value = res?.safeValue ?? evalResult
                    } else {
                      value = evalResult[index]
                      const validationFunc = validationFactory[validationType]
                      const res = validationFunc?.(value, "")
                      value = res?.safeValue ?? value
                    }
                  }
                }
                set(currentItem, `props.${finalPath}`, value)
              })
            }
            if (index !== 0) {
              set(
                currentItem,
                "displayName",
                `list-child-${index}-${currentItem.displayName}`,
              )
              if (disabled != undefined) {
                set(currentItem, "props.disabled", disabled)
              }
            }
            return currentItem
          })
          newCurrentItems = newCurrentItems.map((item) => {
            const displayName = item.displayName
            const displayNameArray = displayName.split("-")
            const realDisplayName = displayNameArray.at(-1)
            const rawWidget = rawTree[realDisplayName as string]
            const validationPaths = rawWidget.$validationPaths
            if (isObject(validationPaths)) {
              Object.keys(validationPaths).forEach((path) => {
                const validationType = validationPaths[path] as VALIDATION_TYPES
                const validationFunc = validationFactory[validationType]
                const currentValue = get(item, `props.${path}`, "")
                const res = validationFunc?.(currentValue, "")
                set(item, `props.${path}`, res?.safeValue)
              })
            }
            return item
          })
          set(currentItemContainer, "childrenNode", newCurrentItems)
        }
        if (index !== 0) {
          set(
            currentItemContainer,
            "displayName",
            `list-widget-container-${index}`,
          )
        }
        return currentItemContainer
      })
    },
    [disabled, executionResult, rawTree],
  )

  const transTemplateContainerNodes = useCallback(
    (templateContainerNode: ComponentNode) => {
      const canvasChildrenArray: ComponentNode[] = []
      if (Array.isArray(dataSources) && dataSources.length > 0) {
        dataSources.forEach((v, index) => {
          canvasChildrenArray[index] = templateContainerNode
        })
        return updateTemplateContainerNodesProps(canvasChildrenArray)
      } else {
        return updateTemplateContainerNodesProps([templateContainerNode])
      }
    },
    [dataSources, updateTemplateContainerNodesProps],
  )

  const getChildrenNodes = useMemo(() => {
    if (childrenNode && childrenNode.length > 0 && dataSources) {
      let canvas = childrenNode[0]
      return transTemplateContainerNodes(canvas)
    }
    return null
  }, [childrenNode, dataSources, transTemplateContainerNodes])

  const handleUpdateSelectedItem = useCallback(
    (index: number) => {
      if (!Array.isArray(dataSources) || disabled) return
      new Promise((resolve) => {
        let value
        if (index < 0 || index > dataSources.length) {
          value = {
            selectedItem: dataSources[0],
            selectedIndex: 0,
          }
        } else {
          value = {
            selectedItem: dataSources[index],
            selectedIndex: index,
          }
        }
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value,
          },
        ])
        resolve(value)
      }).then(() => {
        triggerEventHandler("rowSelect")
      })
    },
    [
      dataSources,
      disabled,
      displayName,
      handleUpdateMultiExecutionResult,
      triggerEventHandler,
    ],
  )

  useEffect(() => {
    if (!isEqual(prevDataSourcesRef.current, dataSources)) {
      handleUpdateMultiExecutionResult?.([
        {
          displayName,
          value: {
            selectedIndex: undefined,
            selectedItem: undefined,
          },
        },
      ])
    }
  }, [dataSources, displayName, handleUpdateMultiExecutionResult])

  return overflowMethod === OVERFLOW_TYPE.PAGINATION &&
    dynamicHeight !== "auto" ? (
    <ListWidgetWithPagination
      {...props}
      copyComponents={getChildrenNodes}
      handleUpdateSelectedItem={handleUpdateSelectedItem}
    />
  ) : (
    <ListWidgetWithScroll
      {...props}
      copyComponents={getChildrenNodes}
      handleUpdateSelectedItem={handleUpdateSelectedItem}
    />
  )
}

export default ListWidget
