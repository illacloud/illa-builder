import { FC, useEffect } from "react"
import { TabsWidgetProps, WrappedTabsProps } from "./interface"
import { applyAlignStyle, fullWidthAndFullHeightStyle } from "./style"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"

export const WrappedTabs: FC<WrappedTabsProps> = (props) => {
  const { value, horizontalAlign, verticalAlign } = props

  return <div css={applyAlignStyle(horizontalAlign, verticalAlign)}></div>
}

WrappedTabs.displayName = "WrappedTabs"

export const TabsWidget: FC<TabsWidgetProps> = (props) => {
  const {
    value,
    navigateContainer,
    horizontalAlign,
    verticalAlign,
    displayName,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    tooltipText,
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      value,
      horizontalAlign,
      verticalAlign,
      setValue: (value: string) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: undefined })
      },
    })

    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
    value,
    horizontalAlign,
    verticalAlign,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
  ])

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div css={fullWidthAndFullHeightStyle}>
        <WrappedTabs {...props} />
      </div>
    </TooltipWrapper>
  )
}

TabsWidget.displayName = "TabsWidget"
