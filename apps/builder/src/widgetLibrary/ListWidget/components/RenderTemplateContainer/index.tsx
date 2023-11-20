import { FC, useCallback } from "react"
import {
  LIST_ITEM_MARGIN_TOP,
  WIDGET_SCALE_SQUARE_BORDER_WIDTH,
} from "@/page/App/components/ScaleSquare/constant/widget"
import { RenderTemplateContainerProps } from "@/widgetLibrary/ListWidget/interface"
import RenderChildrenCanvas from "@/widgetLibrary/PublicSector/RenderChildrenCanvas"

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

      // height + pagination height + pagination gap + every item height
      let componentHeight: number
      let gap = itemGap >= 0 ? itemGap : LIST_ITEM_MARGIN_TOP
      if (enableAutoPagination) {
        componentHeight =
          height +
          extraHeight +
          LIST_ITEM_MARGIN_TOP +
          2 * WIDGET_SCALE_SQUARE_BORDER_WIDTH +
          (height + 2 * WIDGET_SCALE_SQUARE_BORDER_WIDTH + gap) *
            (itemNumber - 1)
      } else {
        componentHeight =
          height +
          2 * WIDGET_SCALE_SQUARE_BORDER_WIDTH +
          (height + 2 * WIDGET_SCALE_SQUARE_BORDER_WIDTH + gap) *
            (itemNumber - 1)
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
    ],
  )

  return (
    <RenderChildrenCanvas
      displayName={templateComponentDisplayName}
      columnNumber={columnNumber}
      handleUpdateHeight={handleUpdateHeight}
      canResizeCanvas={enableAutoHeight}
    />
  )
}

export default RenderTemplateContainer
