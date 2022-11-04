import { FC, forwardRef, useEffect, useMemo } from "react"
import { Menu } from "@illa-design/menu"
import { MenuWidgetProps, WrappedMenuProps } from "./interface"

export const WrappedMenu = forwardRef<HTMLInputElement, WrappedMenuProps>(
  (props, ref) => {
    const {} = props

    return <Menu />
  },
)

export const MenuWidget: FC<MenuWidgetProps> = (props) => {
  const {
    emptyState,
    pageSize,
    displayName,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
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

  return <WrappedMenu emptyState={emptyState} pageSize={pageSize} />
}

WrappedMenu.displayName = "WrappedMenu"
