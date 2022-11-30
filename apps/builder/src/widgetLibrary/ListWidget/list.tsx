import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  ListWidgetProps,
  ListWidgetPropsWithChildrenNodes,
  OVERFLOW_TYPE,
  RenderTemplateContainerProps,
} from "@/widgetLibrary/ListWidget/interface"
import {
  listContainerStyle,
  applyListItemStyle,
  listParentContainerStyle,
  ListParentContainerWithScroll,
  paginationWrapperStyle,
} from "@/widgetLibrary/ListWidget/style"
import useMeasure from "react-use-measure"
import { Pagination } from "@illa-design/react"
import { chunk, cloneDeep, get, isEqual, set } from "lodash"
import {
  applyBarHandlerStyle,
  applyBarPointerStyle,
  applyDashedLineStyle,
} from "@/page/App/components/ScaleSquare/style"
import { Resizable, ResizeCallback, ResizeStartCallback } from "re-resizable"
import store from "@/store"
import { getIllaMode } from "@/redux/config/configSelector"
import {
  BasicContainer,
  BasicContainerWithJSON,
} from "@/widgetLibrary/BasicContainer/BasicContainer"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { useSelector } from "react-redux"
import {
  getExecutionResult,
  getRawTree,
} from "@/redux/currentApp/executionTree/executionSelector"
import { isObject } from "@/utils/typeHelper"
import { VALIDATION_TYPES, validationFactory } from "@/utils/validationFactory"

const RenderTemplateContainer: FC<RenderTemplateContainerProps> = (props) => {
  const { templateComponentNodes, templateContainerHeight } = props
  return (
    <BasicContainer
      componentNode={templateComponentNodes}
      canResizeY={false}
      minHeight={templateContainerHeight - 16}
      padding={8}
      addedRowNumber={0}
    />
  )
}

const RenderCopyContainer: FC<RenderTemplateContainerProps> = (props) => {
  const { templateComponentNodes, templateContainerHeight } = props
  return (
    <BasicContainerWithJSON
      componentNode={templateComponentNodes}
      canResizeY={false}
      minHeight={templateContainerHeight - 16}
      padding={8}
      addedRowNumber={0}
    />
  )
}

const resizeBottomHandler = () => {
  const rootState = store.getState()
  const illaMode = getIllaMode(rootState)
  const scaleSquareState = illaMode !== "edit" ? "production" : "normal"
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
    illaMode,
  } = props
  const [containerRef, containerBounds] = useMeasure()
  const [isMouseHover, setIsMouseHover] = useState(false)

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
  const isEditor = illaMode === "edit"

  const canShowBorder = isEditor && isMouseHover

  return (
    <div
      css={listParentContainerStyle}
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
          maxHeight={containerBounds.height - 4}
          handleComponent={isMouseHover ? resizeBottomHandler() : undefined}
          enable={{
            bottom: true,
          }}
          onResizeStart={handleResizeStart}
          onResizeStop={handleOnResizeTopStop}
        >
          <div
            css={applyListItemStyle(true, canShowBorder, itemBackGroundColor)}
            onClick={() => {
              handleUpdateSelectedItem(0)
            }}
          >
            <RenderTemplateContainer
              templateComponentNodes={childrenNode[0]}
              templateContainerHeight={itemHeight}
            />
          </div>
          {isMouseHover && (
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
                isEditor,
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
              />
            </div>
          )
        })}
      </div>
      <div css={paginationWrapperStyle}>
        <Pagination
          total={dataSources?.length}
          currentPage={currentPage}
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
    copyComponents,
    handleUpdateSelectedItem,
    itemBackGroundColor,
    illaMode,
  } = props
  const [containerRef, containerBounds] = useMeasure()
  const [isMouseHover, setIsMouseHover] = useState(false)
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

  const isEditor = illaMode === "edit"
  const canShowBorder = isEditor && isMouseHover
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
        maxHeight={containerBounds.height - 4}
        handleComponent={isMouseHover ? resizeBottomHandler() : undefined}
        enable={{
          bottom: true,
        }}
        onResizeStart={handleResizeStart}
        onResizeStop={handleOnResizeTopStop}
      >
        <div
          css={applyListItemStyle(true, canShowBorder, itemBackGroundColor)}
          onClick={() => {
            handleUpdateSelectedItem(0)
          }}
        >
          <RenderTemplateContainer
            templateComponentNodes={childrenNode[0]}
            templateContainerHeight={itemHeight}
          />
        </div>
        {isMouseHover && <div css={applyDashedLineStyle(false, true, false)} />}
      </Resizable>
      {copyComponents?.map((node, index) => {
        if (index === 0) return null
        return (
          <div
            css={applyListItemStyle(
              false,
              canShowBorder,
              itemBackGroundColor,
              isEditor,
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
    handleOnRowSelect,
    disabled,
  } = props

  const propsRef = useRef(props)
  const executionResult = useSelector(getExecutionResult)
  const rawTree = useSelector(getRawTree)
  const illaMode = useSelector(getIllaMode)

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
      new Promise((resolve, reject) => {
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
        handleOnRowSelect()
      })
    },
    [
      dataSources,
      disabled,
      displayName,
      handleOnRowSelect,
      handleUpdateGlobalData,
      handleUpdateMultiExecutionResult,
    ],
  )

  return overflowMethod === OVERFLOW_TYPE.PAGINATION ? (
    <ListWidgetWithPagination
      {...props}
      copyComponents={getChildrenNodes}
      handleUpdateSelectedItem={handleUpdateSelectedItem}
      illaMode={illaMode}
    />
  ) : (
    <ListWidgetWithScroll
      {...props}
      copyComponents={getChildrenNodes}
      handleUpdateSelectedItem={handleUpdateSelectedItem}
      illaMode={illaMode}
    />
  )
}
