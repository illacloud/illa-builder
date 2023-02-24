import { chunk, cloneDeep, get, isEqual, set } from "lodash"
import { Resizable, ResizeCallback, ResizeStartCallback } from "re-resizable"
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useSelector } from "react-redux"
import useMeasure from "react-use-measure"
import { Pagination } from "@illa-design/react"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/renderComponentCanvas"
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
import store from "@/store"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { isObject } from "@/utils/typeHelper"
import { VALIDATION_TYPES, validationFactory } from "@/utils/validationFactory"
import {
  BasicContainer,
  BasicContainerWithJSON,
} from "@/widgetLibrary/BasicContainer/BasicContainer"
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
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"

const RenderTemplateContainer: FC<RenderTemplateContainerProps> = (props) => {
  const {
    templateComponentNodes,
    blockColumns,
    dynamicHeight,
    handleUpdateOriginalDSLMultiAttr,
    updateComponentHeight,
    itemNumber = 1,
    h,
    dynamicMinHeight,
    dynamicMaxHeight,
    templateContainerHeight,
  } = props

  const updateAllComponentHeight = useCallback(
    (height: number) => {
      if (height * itemNumber + 8 * (itemNumber - 1) === h) return

      handleUpdateOriginalDSLMultiAttr({
        itemHeight: height,
      })
      updateComponentHeight &&
        setTimeout(() => {
          updateComponentHeight?.(height * itemNumber + 8 * (itemNumber - 1))
        }, 60)
    },
    [h, handleUpdateOriginalDSLMultiAttr, itemNumber, updateComponentHeight],
  )

  const enableAutoHeight = useMemo(() => {
    switch (dynamicHeight) {
      case "auto":
        return true
      case "limited":
        return h * UNIT_HEIGHT >= (dynamicMinHeight ?? h * UNIT_HEIGHT)
      case "fixed":
      default:
        return false
    }
  }, [dynamicHeight, dynamicMinHeight, h])

  const dynamicOptions = useMemo(
    () => ({
      dynamicMinHeight,
      dynamicMaxHeight,
    }),
    [dynamicMaxHeight, dynamicMinHeight],
  )

  const basicContainerProps =
    dynamicHeight !== "fixed"
      ? {
          canResizeY: true,
          safeRowNumber: 1,
          addedRowNumber: 1,
        }
      : {
          canResizeY: false,
          addedRowNumber: 0,
        }

  return (
    <AutoHeightContainer
      updateComponentHeight={updateAllComponentHeight}
      enable={enableAutoHeight}
      dynamicOptions={dynamicOptions}
    >
      <BasicContainer
        {...basicContainerProps}
        componentNode={templateComponentNodes}
        minHeight={templateContainerHeight - 16}
        padding={8}
        blockColumns={blockColumns}
      />
    </AutoHeightContainer>
  )
}

const RenderCopyContainer: FC<RenderCopyContainerProps> = (props) => {
  const { templateComponentNodes, templateContainerHeight, blockColumns } =
    props
  return (
    <BasicContainerWithJSON
      componentNode={templateComponentNodes}
      canResizeY={false}
      minHeight={templateContainerHeight - 16}
      padding={8}
      addedRowNumber={0}
      blockColumns={blockColumns}
    />
  )
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

const handleResizeStart: ResizeStartCallback = (e) => {
  e.preventDefault()
  e.stopPropagation()
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
    blockColumns,
    dynamicHeight = "fixed",
    h,
  } = props
  const [containerRef, containerBounds] = useMeasure()
  const [isMouseHover, setIsMouseHover] = useState(false)
  const isEditMode = useSelector(getIsILLAEditMode)

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

  const handleOnResizeTopStop: ResizeCallback = useCallback(
    (e, dir, elementRef, delta) => {
      const { height } = delta
      let finalHeight = itemHeight + height
      handleUpdateOriginalDSLMultiAttr({
        itemHeight: finalHeight,
      })
    },
    [handleUpdateOriginalDSLMultiAttr, itemHeight],
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
              blockColumns={blockColumns}
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
                blockColumns={blockColumns}
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
    blockColumns,
    dynamicHeight,
    updateComponentHeight,
    h,
    dynamicMinHeight,
    dynamicMaxHeight,
  } = props
  const [containerRef, containerBounds] = useMeasure()
  const [isMouseHover, setIsMouseHover] = useState(false)
  const isEditMode = useSelector(getIsILLAEditMode)

  const propsRef = useRef(props)

  useEffect(() => {
    if (!isEqual(propsRef.current, props)) {
      propsRef.current = props
    }
  }, [props])

  const handleOnResizeTopStop: ResizeCallback = useCallback(
    (e, dir, elementRef, delta) => {
      const { height } = delta
      let finalHeight = itemHeight + height
      handleUpdateOriginalDSLMultiAttr({
        itemHeight: finalHeight,
      })
    },
    [handleUpdateOriginalDSLMultiAttr, itemHeight],
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
            blockColumns={blockColumns}
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
              blockColumns={blockColumns}
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
    handleUpdateGlobalData,
    handleDeleteGlobalData,
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

  useEffect(() => {
    handleUpdateGlobalData?.(displayName, { ...props })

    return () => {
      handleDeleteGlobalData?.(displayName)
    }
  }, [displayName, handleDeleteGlobalData, handleUpdateGlobalData, props])

  const updateTemplateContainerNodesProps = useCallback(
    (childrenNodes: ComponentNode[]) => {
      return childrenNodes.map((itemContainer, index) => {
        const currentItems = itemContainer.childrenNode
        if (Array.isArray(currentItems) && currentItems.length > 0) {
          const newCurrentItems = currentItems.map((currentItem) => {
            if (
              currentItem.props &&
              Array.isArray(currentItem.props.$dynamicAttrPaths)
            ) {
              const { displayName } = currentItem
              const { $dynamicAttrPaths } = currentItem.props
              $dynamicAttrPaths.forEach((path) => {
                const requireEvalString = get(currentItem.props, path, "")
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
                    const validationType = validationPaths[path]
                    if (validationType === VALIDATION_TYPES.ARRAY) {
                      const validationFunc = validationFactory[validationType]
                      const { safeValue } = validationFunc(evalResult, "")
                      value = safeValue
                    } else {
                      value = evalResult[index]
                      const validationFunc = validationFactory[validationType]
                      const { safeValue } = validationFunc(value, "")
                      value = safeValue
                    }
                  }
                }
                set(currentItem, `props.${path}`, value)
              })
            }
            if (index !== 0) {
              set(
                currentItem,
                "displayName",
                `list-child-${index}-${currentItem.displayName}`,
              )
              set(currentItem, "props.disabled", disabled || false)
            }
            return currentItem
          })
          set(itemContainer, "childrenNode", newCurrentItems)
        }
        if (index !== 0) {
          set(itemContainer, "displayName", `list-widget-container-${index}`)
        }
        return itemContainer
      })
    },
    [disabled, executionResult, rawTree],
  )

  const transTemplateContainerNodes = useCallback(
    (templateContainerNode: ComponentNode) => {
      const canvasChildrenArray: ComponentNode[] = []
      if (Array.isArray(dataSources) && dataSources.length > 0) {
        dataSources.forEach((v, index) => {
          canvasChildrenArray[index] = cloneDeep(templateContainerNode)
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
      const children = cloneDeep(childrenNode)
      let canvas = children[0]
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
        handleUpdateGlobalData?.(displayName, value)
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
      handleUpdateGlobalData,
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
