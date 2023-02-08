import { debounce } from "lodash"
import { FC, forwardRef, useEffect, useRef } from "react"
import { Menu, SubMenuProps } from "@illa-design/react"
import { MenuWidgetProps, WrappedMenuProps } from "./interface"

export const WrappedMenu = forwardRef<HTMLDivElement, WrappedMenuProps>(
  (props, ref) => {
    const { mode, horizontalAlign, items, onClickSubMenu, onClickMenuItem } =
      props

    return (
      <Menu
        w="100%"
        mode={mode}
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
    horizontalAlign,
    items,
    displayName,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    updateComponentHeight,
    handleOnClickMenuItem,
  } = props

  useEffect(() => {
    handleUpdateGlobalData(displayName, {})
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [
    displayName,
    handleUpdateGlobalData,
    handleUpdateDsl,
    handleDeleteGlobalData,
  ])

  const ref = useRef<HTMLDivElement>(null)

  const updateHeight = debounce(() => {
    updateComponentHeight(ref.current?.clientHeight ?? 0)
  }, 200)

  useEffect(() => {
    updateHeight()
  }, [mode, updateHeight])

  return (
    <div ref={ref}>
      <WrappedMenu
        mode={mode}
        horizontalAlign={horizontalAlign}
        onClickMenuItem={(value, valuePath) => {
          if (valuePath.length === 1) {
            handleOnClickMenuItem?.(
              `items.${items?.findIndex((i) => i.value === value)}.events`,
            )
          } else if (valuePath.length === 2) {
            const sub = items?.findIndex((i) => i.value === valuePath[0])
            if (sub && items && "subItems" in items[sub]) {
              const subIndex = (items[sub] as SubMenuProps).subItems?.findIndex(
                (i) => i.value === valuePath[1],
              )
              handleOnClickMenuItem?.(
                `items.${sub}.subItems.${subIndex}.events`,
              )
            }
          }
        }}
        onClickSubMenu={(value) => {
          if (mode === "vertical") {
            updateHeight()
          }
          handleOnClickMenuItem?.(
            `items.${items?.findIndex((i) => i.value === value)}.events`,
          )
        }}
        items={items}
      />
    </div>
  )
}

WrappedMenu.displayName = "WrappedMenu"
