import { FC, useEffect, useMemo, useState } from "react"
import { TabsWidgetProps, WrappedTabsProps } from "./interface"
import { applyAlignStyle, fullWidthAndFullHeightStyle } from "./style"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { TabPane, Tabs } from "@illa-design/tabs"

export const WrappedTabs: FC<WrappedTabsProps> = (props) => {
  const {
    value,
    align,
    activeKey,
    disabled,
    horizontalAlign,
    tabList,
    colorScheme,
    tabPosition,
    handleUpdateDsl,
    handleOnChange,
  } = props
  const [currentKey, setCurrentKey] = useState(activeKey)

  useEffect(() => {
    setCurrentKey(activeKey)
  }, [activeKey])

  return (
    <Tabs
      w={"100%"}
      align={align}
      colorScheme={colorScheme}
      tabPosition={tabPosition}
      activeKey={currentKey}
      onChange={(value) => {
        setCurrentKey(value)
        new Promise((resolve) => {
          handleUpdateDsl({ currentKey: value })
          resolve(true)
        }).then(() => {
          handleOnChange?.()
        })
      }}
    >
      {tabList?.map((item) => {
        if (item.hidden) return
        return (
          <TabPane
            key={item.key}
            title={item.label}
            disabled={disabled || item.disabled}
          />
        )
      })}
    </Tabs>
  )
}

WrappedTabs.displayName = "WrappedTabs"

export const TabsWidget: FC<TabsWidgetProps> = (props) => {
  const {
    value,
    align,
    disabled,
    navigateContainer,
    currentKey,
    tabList,
    viewList,
    horizontalAlign,
    displayName,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    tooltipText,
    colorScheme,
    tabPosition,
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      value,
      horizontalAlign,
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
          {...props}
          tabList={list}
          value={value}
          align={align}
          activeKey={currentKey}
          horizontalAlign={horizontalAlign}
          colorScheme={colorScheme}
          tabPosition={tabPosition}
          disabled={disabled}
        />
      </div>
    </TooltipWrapper>
  )
}

TabsWidget.displayName = "TabsWidget"
