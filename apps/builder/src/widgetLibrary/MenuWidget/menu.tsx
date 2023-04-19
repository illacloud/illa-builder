import { toPath } from "lodash"
import { FC, forwardRef, useCallback } from "react"
import { Menu, SubMenuProps } from "@illa-design/react"
import { convertPathToString } from "@/utils/executionTreeHelper/utils"
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
        const index = items?.findIndex((i) => i.value === value) ?? 0
        const pathArray = ["items", `${index}`, "events"]
        triggerEventHandler(
          "clickMenuItem",
          convertPathToString(pathArray),
          undefined,
          (path) => {
            return convertPathToString(toPath(path).slice(3))
          },
        )
      } else if (valuePath.length === 2) {
        const sub = items?.findIndex((i) => i.value === valuePath[0])
        if (sub && items && "subItems" in items[sub]) {
          const subIndex = (items[sub] as SubMenuProps).subItems?.findIndex(
            (i) => i.value === valuePath[1],
          )
          const pathArray = [
            "items",
            `${sub}`,
            "subItems",
            `${subIndex}`,
            "events",
          ]
          triggerEventHandler(
            "clickMenuItem",
            convertPathToString(pathArray),
            undefined,
            (path) => {
              return convertPathToString(toPath(path).slice(5))
            },
          )
        }
      }
    },
    [displayName, handleUpdateMultiExecutionResult, items, triggerEventHandler],
  )

  const handleClickSubMenu = useCallback(
    (value: string) => {
      const index = items?.findIndex((i) => i.value === value) ?? 0
      const paths = ["items", `${index}`, "events"]
      triggerEventHandler(
        "clickMenuItem",
        convertPathToString(paths),
        undefined,
        (path) => {
          return convertPathToString(toPath(path).slice(3))
        },
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
