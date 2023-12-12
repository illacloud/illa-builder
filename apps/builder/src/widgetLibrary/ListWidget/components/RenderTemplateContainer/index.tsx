import { FC, useCallback } from "react"
import {
  LIST_ITEM_MARGIN_TOP,
  WIDGET_SCALE_SQUARE_BORDER_WIDTH,
} from "@/page/App/components/ScaleSquare/constant/widget"
import { RenderTemplateContainerProps } from "@/widgetLibrary/ListWidget/interface"
import RenderChildrenCanvas from "@/widgetLibrary/PublicSector/RenderChildrenCanvas"
import { getGapByShadow } from "../../utils"

const RenderTemplateContainer: FC<RenderTemplateContainerProps> = (props) => {
  const {
    templateComponentDisplayName,
    columnNumber,
    itemGap = LIST_ITEM_MARGIN_TOP,
    dynamicHeight,
    extraHeight = 0,
    templateContainerHeight,
    handleUpdateOriginalDSLMultiAttr,
    updateComponentHeight,
    itemNumber = 1,
    enableAutoPagination,
    itemShadow,
    itemPadding,
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

      // height + pagination height + pagination gap + every item height + container padding y * 2
      let componentHeight: number
      let gap = itemGap >= 0 ? itemGap : LIST_ITEM_MARGIN_TOP
      if (enableAutoPagination) {
        componentHeight =
          height +
          extraHeight +
          LIST_ITEM_MARGIN_TOP +
          2 * WIDGET_SCALE_SQUARE_BORDER_WIDTH +
          (height + 2 * WIDGET_SCALE_SQUARE_BORDER_WIDTH + gap) *
            (itemNumber - 1) +
          getGapByShadow(itemShadow) * 2
      } else {
        componentHeight =
          height +
          2 * WIDGET_SCALE_SQUARE_BORDER_WIDTH +
          (height + 2 * WIDGET_SCALE_SQUARE_BORDER_WIDTH + gap) *
            (itemNumber - 1) +
          getGapByShadow(itemShadow) * 2
      }
      updateComponentHeight(componentHeight)
    },
    [
      handleUpdateOriginalDSLMultiAttr,
      itemNumber,
      templateContainerHeight,
      updateComponentHeight,
      extraHeight,
      enableAutoPagination,
      itemGap,
      itemShadow,
    ],
  )

  return (
    <RenderChildrenCanvas
      displayName={templateComponentDisplayName}
      columnNumber={columnNumber}
      handleUpdateHeight={handleUpdateHeight}
      canResizeCanvas={enableAutoHeight}
      containerPadding={itemPadding?.size}
    />
  )
}

export default RenderTemplateContainer
