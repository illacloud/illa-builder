import { chunk } from "lodash-es"
import { Resizable, ResizeCallback, ResizeStartCallback } from "re-resizable"
import { FC, useCallback, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useMeasure from "react-use-measure"
import { Pagination } from "@illa-design/react"
import { LIST_ITEM_MARGIN_TOP } from "@/page/App/components/ScaleSquare/constant/widget"
import { applyDashedLineStyle } from "@/page/App/components/ScaleSquare/style"
import { getIsILLAEditMode } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getShadowStyle } from "@/utils/styleUtils/shadow"
import RenderCopyContainer from "@/widgetLibrary/GridListWidget/components/RenderCopyContainer"
import RenderTemplateContainer from "@/widgetLibrary/GridListWidget/components/RenderTemplateContainer"
import {
  COLUMN_NUM_ADAPTATION,
  ListWidgetPropsWithChildrenNodes,
} from "@/widgetLibrary/GridListWidget/interface"
import {
  applyListItemStyle,
  itemContainerStyle,
  listParentContainerWithPagination,
  paginationWrapperStyle,
  selectStyle,
} from "@/widgetLibrary/GridListWidget/style"
import { resizeBottomHandler } from "@/widgetLibrary/GridListWidget/utils"

const ListWidgetWithAutoPagination: FC<ListWidgetPropsWithChildrenNodes> = (
  props,
) => {
  const {
    dataSources,
    itemHeight = 48,
    displayName,
    page = 0,
    dynamicMinHeight,
    dynamicMaxHeight,
    enablePagination,
    childrenNode,
    itemGapX = LIST_ITEM_MARGIN_TOP,
    itemGapY = LIST_ITEM_MARGIN_TOP,
    itemShadow,
    itemBorderColor,
    itemBorderRadius,
    itemBorderWidth,
    columnNumAdaptation,
    numberOfColumns = 3,
    minColumnWidth,
    handleUpdateOriginalDSLMultiAttr,
    updateComponentHeight,
    copyComponents,
    pageSize,
    handleUpdateSelectedItem,
    itemBackGroundColor,
    columnNumber,
    dynamicHeight = "fixed",
    selectIndexForMark,
    themeColor,
    loading,
    handleUpdateMultiExecutionResult,
    itemPadding,
    h,
  } = props

  const [containerRef, containerBounds] = useMeasure()
  const [paginationRef, paginationBounds] = useMeasure()
  const [itemRef, itemBounds] = useMeasure()
  const [isMouseHover, setIsMouseHover] = useState(false)
  const isEditMode = useSelector(getIsILLAEditMode)
  const dispatch = useDispatch()
  const safePageSize = !pageSize ? 0 : pageSize

  const currentContainerBoundsHeight =
    containerBounds.height - paginationBounds.height
  const itemNumber = useMemo(() => {
    if (enablePagination) {
      return safePageSize
    } else {
      return dataSources?.length
    }
  }, [dataSources?.length, enablePagination, safePageSize])

  const handleChangeCurrentPage = useCallback(
    (pageNumber: number) => {
      handleUpdateSelectedItem()
      handleUpdateMultiExecutionResult([
        {
          displayName,
          value: {
            page: pageNumber - 1,
          },
        },
      ])
    },
    [displayName, handleUpdateMultiExecutionResult, handleUpdateSelectedItem],
  )

  const currentData = useMemo(() => {
    const chunkData = chunk(copyComponents, itemNumber)
    if (chunkData.length === 0) return []
    return page < chunkData.length ? chunkData[page] : chunkData[0]
  }, [copyComponents, page, itemNumber])

  const rowsNum = useMemo(() => {
    if (
      columnNumAdaptation === COLUMN_NUM_ADAPTATION.FIXED &&
      !!numberOfColumns
    ) {
      return Math.ceil(currentData.length / numberOfColumns)
    } else {
      return Math.ceil(
        currentData.length / (containerBounds.width / itemBounds.width),
      )
    }
  }, [
    columnNumAdaptation,
    containerBounds.width,
    currentData.length,
    itemBounds.width,
    numberOfColumns,
  ])

  const handleResizeStart: ResizeStartCallback = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(
      configActions.setResizingNodeIDsReducer([`${displayName}-resize-grid`]),
    )
  }

  const handleOnResizeTopStop: ResizeCallback = useCallback(
    (e, dir, elementRef, delta) => {
      const { height } = delta
      let finalHeight = itemHeight + height
      handleUpdateOriginalDSLMultiAttr({
        itemHeight: finalHeight,
      })
      dispatch(configActions.setResizingNodeIDsReducer([]))
    },
    [dispatch, handleUpdateOriginalDSLMultiAttr, itemHeight],
  )

  const canShowBorder = isEditMode && isMouseHover

  const shadowStyle = getShadowStyle(itemShadow)
  const borderStyle = useMemo(() => {
    let borderWidth, borderRadius
    const borderWidthNum = itemBorderWidth?.match(/\d+(\.\d+)?/g)
    if (borderWidthNum) borderWidth = borderWidthNum?.join("") + "px"
    const radiusNum = itemBorderRadius?.match(/\d+(\.\d+)?/g)
    if (radiusNum) borderRadius = radiusNum?.join("") + "px"
    return `
    border: ${
      borderWidth ? `${borderWidth} solid ${itemBorderColor}` : "unset"
    };
      border-radius: ${borderRadius ?? "unset"}
    `
  }, [itemBorderColor, itemBorderRadius, itemBorderWidth])

  return (
    <div
      css={listParentContainerWithPagination}
      onMouseEnter={() => {
        setIsMouseHover(true)
      }}
      onMouseLeave={() => {
        setIsMouseHover(false)
      }}
      ref={containerRef}
    >
      <div
        css={itemContainerStyle(
          columnNumAdaptation!,
          itemGapX,
          itemGapY,
          itemShadow,
          numberOfColumns,
          minColumnWidth,
        )}
      >
        {(page == undefined || page === 0) && (
          <Resizable
            size={{
              width: "100%",
              height: itemHeight,
            }}
            key={childrenNode[0]}
            bounds="parent"
            minHeight={48}
            maxHeight={
              dynamicHeight !== "fixed"
                ? "unset"
                : currentContainerBoundsHeight - 4
            }
            handleComponent={isMouseHover ? resizeBottomHandler() : undefined}
            enable={
              dynamicHeight !== "fixed" || loading
                ? {}
                : {
                    bottom: true,
                  }
            }
            onResizeStart={handleResizeStart}
            onResizeStop={handleOnResizeTopStop}
          >
            <div
              css={selectStyle(
                selectIndexForMark === 0,
                isEditMode,
                themeColor,
                itemBorderRadius,
              )}
            >
              <div
                css={applyListItemStyle(
                  true,
                  itemBackGroundColor,
                  shadowStyle,
                  borderStyle,
                  isEditMode,
                  loading,
                )}
                ref={itemRef}
                onClick={(e) => {
                  const isClickOnContainer = !!(
                    e.target as HTMLElement
                  )?.getAttribute("data-list-widget-container")
                  handleUpdateSelectedItem(0, isClickOnContainer)
                }}
              >
                <RenderTemplateContainer
                  templateComponentDisplayName={childrenNode[0]}
                  templateContainerHeight={itemHeight}
                  columnNumber={columnNumber}
                  dynamicHeight={dynamicHeight}
                  itemNumber={rowsNum}
                  extraHeight={paginationBounds.height}
                  itemShadow={itemShadow}
                  enableAutoPagination={enablePagination}
                  handleUpdateOriginalDSLMultiAttr={
                    handleUpdateOriginalDSLMultiAttr
                  }
                  h={h}
                  updateComponentHeight={updateComponentHeight}
                  dynamicMinHeight={dynamicMinHeight}
                  dynamicMaxHeight={dynamicMaxHeight}
                  itemGap={itemGapY}
                  itemPadding={itemPadding}
                />
              </div>
            </div>
            {canShowBorder && (
              <div css={applyDashedLineStyle(false, true, false)} />
            )}
          </Resizable>
        )}
        {currentData.map((node, index) => {
          if ((page == undefined || page === 0) && index === 0) {
            return null
          }
          const step = page == undefined ? 0 : page
          return (
            <div
              key={node.displayName}
              css={selectStyle(
                selectIndexForMark === index,
                isEditMode,
                themeColor,
                itemBorderRadius,
                itemHeight,
              )}
            >
              <div
                css={applyListItemStyle(
                  false,
                  itemBackGroundColor,
                  shadowStyle,
                  borderStyle,
                  isEditMode,
                  loading,
                  itemHeight,
                  itemPadding?.size,
                )}
                onClick={(e) => {
                  const isClickOnContainer = !!(
                    e.target as HTMLElement
                  )?.getAttribute("data-list-widget-container")
                  handleUpdateSelectedItem(index, isClickOnContainer)
                }}
              >
                <RenderCopyContainer
                  templateComponentNodes={node}
                  templateContainerHeight={itemHeight}
                  columnNumber={columnNumber}
                  displayNamePrefix={`grid-list-child-${
                    step * itemNumber! + index
                  }-`}
                />
              </div>
            </div>
          )
        })}
      </div>
      {enablePagination && (
        <div css={paginationWrapperStyle} ref={paginationRef}>
          <Pagination
            total={dataSources?.length}
            current={page + 1}
            pageSize={itemNumber}
            disableSimplePageJump
            size="medium"
            sizeCanChange={false}
            hideOnSinglePage={false}
            simple
            onChange={handleChangeCurrentPage}
          />
        </div>
      )}
    </div>
  )
}

export default ListWidgetWithAutoPagination
