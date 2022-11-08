import { FC, forwardRef, useEffect, useMemo } from "react"
import { Menu } from "@illa-design/menu"
import { MenuWidgetProps, WrappedMenuProps } from "./interface"

export const WrappedMenu = forwardRef<HTMLInputElement, WrappedMenuProps>(
  (props, ref) => {
    const { menuList } = props
    const { Item, SubMenu } = Menu

    return (
      <Menu>
        {menuList?.map((item, index) => {
          if (item.subMenu) {
            return (
              <SubMenu key={item.title} title={item.title}>
                {item.subMenu.map((subItem, index) => {
                  return <Item key={subItem.title} title={subItem.title} />
                })}
              </SubMenu>
            )
          }
          return <Item key={item.title} />
        })}
      </Menu>
    )
  },
)

export const MenuWidget: FC<MenuWidgetProps> = (props) => {
  const {
    menuList,
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

  return (
    <WrappedMenu
      menuList={menuList}
      emptyState={emptyState}
      pageSize={pageSize}
    />
  )
}

WrappedMenu.displayName = "WrappedMenu"
