import { debounce } from "lodash"
import { FC, forwardRef, useCallback, useEffect, useRef } from "react"
import { Menu, SubMenuProps } from "@illa-design/react"
import { AutoHeightContainer } from "@/widgetLibrary/PublicSector/AutoHeightContainer"
import { MenuWidgetProps, WrappedMenuProps } from "./interface"

export const WrappedMenu = forwardRef<HTMLDivElement, WrappedMenuProps>(
  (props, ref) => {
    const {
      mode,
      horizontalAlign,
      selectedValues,
      items,
      onClickSubMenu,
      onClickMenuItem,
    } = props

    return (
      <Menu
        w="100%"
        mode={mode}
        selectedValues={selectedValues}
        onClickSubMenu={onClickSubMenu}
        horizontalAlign={horizontalAlign}
        onClickMenuItem={onClickMenuItem}
        items={items}
      />
    )
  },
)

export const MenuWidget: FC<MenuWidgetProps> = (props) => {
  const {
    mode,
    selectedValues,
    horizontalAlign,
    items,
    displayName,
    handleUpdateMultiExecutionResult,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    updateComponentHeight,
    triggerEventHandler,
  } = props

  const handleOnClickMenuItem = useCallback(
    (value: string, valuePath: string[]) => {
      handleUpdateMultiExecutionResult([
        {
          displayName,
          value: {
            selectedValues: [value],
          },
        },
      ])
      if (valuePath.length === 1) {
        triggerEventHandler(
          "clickMenuItem",
          `items.${items?.findIndex((i) => i.value === value)}.events`,
        )
      } else if (valuePath.length === 2) {
        const sub = items?.findIndex((i) => i.value === valuePath[0])
        if (sub && items && "subItems" in items[sub]) {
          const subIndex = (items[sub] as SubMenuProps).subItems?.findIndex(
            (i) => i.value === valuePath[1],
          )
          triggerEventHandler(
            "clickMenuItem",
            `items.${sub}.subItems.${subIndex}.events`,
          )
        }
      }
    },
    [displayName, handleUpdateMultiExecutionResult, items, triggerEventHandler],
  )

  useEffect(() => {
    handleUpdateGlobalData(displayName, {})
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [displayName, handleUpdateGlobalData, handleDeleteGlobalData])

  const handleClickSubMenu = useCallback(
    (value: string) => {
      triggerEventHandler(
        "clickMenuItem",
        `items.${items?.findIndex((i) => i.value === value)}.events`,
      )
    },
    [items, triggerEventHandler],
  )

  return (
    <AutoHeightContainer updateComponentHeight={updateComponentHeight}>
      <WrappedMenu
        selectedValues={selectedValues}
        mode={mode}
        horizontalAlign={horizontalAlign}
        onClickMenuItem={handleOnClickMenuItem}
        onClickSubMenu={handleClickSubMenu}
        items={items}
      />
    </AutoHeightContainer>
  )
}

WrappedMenu.displayName = "WrappedMenu"
