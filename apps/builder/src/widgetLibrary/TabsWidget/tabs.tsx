import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { TabPane, Tabs } from "@illa-design/react"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { TabsWidgetProps, WrappedTabsProps } from "./interface"
import { fullWidthAndFullHeightStyle } from "./style"

export const WrappedTabs: FC<WrappedTabsProps> = (props) => {
  const {
    value,
    align,
    activeKey,
    disabled,
    tabList,
    colorScheme,
    tabPosition,
    handleOnChange,
    handleUpdateOriginalDSLMultiAttr,
  } = props

  return (
    <Tabs
      w={"100%"}
      align={align}
      colorScheme={colorScheme}
      tabPosition={tabPosition}
      activeKey={activeKey}
      onChange={(value) => {
        new Promise((resolve) => {
          const currentIndex = tabList?.findIndex((view) => view.key === value)
          handleUpdateOriginalDSLMultiAttr({ currentKey: value, currentIndex })
          resolve(true)
        }).then(() => {
          handleOnChange?.()
        })
      }}
    >
      {tabList?.map((item) => {
        if (item.hidden) return null
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
    displayName,
    linkWidgetDisplayName,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    handleUpdateOriginalDSLMultiAttr,
    handleUpdateOriginalDSLOtherMultiAttr,
    tooltipText,
    colorScheme,
    tabPosition,
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {
      value,
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
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
  ])

  const list = useMemo(() => {
    if (navigateContainer) return viewList
    return tabList
  }, [navigateContainer, tabList, viewList])

  const handleUpdateMultiAttrDSL = useCallback(
    (updateSlice) => {
      handleUpdateOriginalDSLMultiAttr?.(updateSlice)
      if (navigateContainer && linkWidgetDisplayName) {
        handleUpdateOriginalDSLOtherMultiAttr?.(
          linkWidgetDisplayName,
          updateSlice,
        )
      }
    },
    [
      navigateContainer,
      linkWidgetDisplayName,
      handleUpdateOriginalDSLMultiAttr,
      handleUpdateOriginalDSLOtherMultiAttr,
    ],
  )

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div css={fullWidthAndFullHeightStyle}>
        <WrappedTabs
          {...props}
          tabList={list}
          value={value}
          align={align}
          activeKey={currentKey}
          colorScheme={colorScheme}
          tabPosition={tabPosition}
          disabled={disabled}
          handleUpdateOriginalDSLMultiAttr={handleUpdateMultiAttrDSL}
        />
      </div>
    </TooltipWrapper>
  )
}

TabsWidget.displayName = "TabsWidget"
