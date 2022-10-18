import { FC, useEffect, useMemo } from "react"
import { TabsWidgetProps, WrappedTabsProps } from "./interface"
import { applyAlignStyle, fullWidthAndFullHeightStyle } from "./style"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { TabPane, Tabs } from "@illa-design/tabs"

export const WrappedTabs: FC<WrappedTabsProps> = (props) => {
  const { value, horizontalAlign, verticalAlign, tabList } = props

  return (
    <div css={applyAlignStyle(horizontalAlign, verticalAlign)}>
      <Tabs>
        {tabList?.map((item) => {
          console.log(item, "TabList TabPane item")
          return (
            <TabPane
              key={item.key}
              title={item.label}
              disabled={item.disabled}
            />
          )
        })}
      </Tabs>
    </div>
  )
}

WrappedTabs.displayName = "WrappedTabs"

export const TabsWidget: FC<TabsWidgetProps> = (props) => {
  const {
    value,
    navigateContainer,
    tabList,
    viewList,
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

  const list = useMemo(() => {
    if (navigateContainer) return viewList
    return tabList
  }, [navigateContainer, tabList, viewList])

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div css={fullWidthAndFullHeightStyle}>
        <WrappedTabs
          tabList={list}
          value={value}
          horizontalAlign={horizontalAlign}
          verticalAlign={verticalAlign}
        />
      </div>
    </TooltipWrapper>
  )
}

TabsWidget.displayName = "TabsWidget"
