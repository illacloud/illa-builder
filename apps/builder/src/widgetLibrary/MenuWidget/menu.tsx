import { FC, forwardRef, useEffect, useMemo, useRef } from "react"
import { Menu } from "@illa-design/menu"
import { MenuWidgetProps, WrappedMenuProps } from "./interface"
import { css } from "@emotion/react"
import { MenuItemLabel } from "@/widgetLibrary/MenuWidget/MenuItemLabel"

export const WrappedMenu = forwardRef<HTMLInputElement, WrappedMenuProps>(
  (props, ref) => {
    const { menuList, mode } = props
    const { Item, SubMenu } = Menu

    return (
      <Menu mode={mode}>
        {menuList?.map((item, index) => {
          if (item.subMenu) {
            return (
              <SubMenu
                key={item.id}
                title={<MenuItemLabel title={item.title} icon={item.icon} />}
              >
                {item.subMenu.map((subItem, index) => {
                  return (
                    <Item
                      key={subItem.title}
                      title={
                        <MenuItemLabel title={item.title} icon={item.icon} />
                      }
                    />
                  )
                })}
              </SubMenu>
            )
          }
          return <Item key={item.id} title={item.title} />
        })}
      </Menu>
    )
  },
)

export const MenuWidget: FC<MenuWidgetProps> = (props) => {
  const {
    mode,
    menuList,
    emptyState,
    pageSize,
    displayName,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    updateComponentHeight,
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

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (wrapperRef.current) {
      updateComponentHeight(wrapperRef.current?.clientHeight)
    }
  }, [mode])

  const menu = useMemo(() => {
    menuList?.map((item, index) => {})
  }, [menuList])

  return (
    <div ref={wrapperRef}>
      <WrappedMenu
        mode={mode}
        menuList={menuList}
        emptyState={emptyState}
        pageSize={pageSize}
      />
    </div>
  )
}

WrappedMenu.displayName = "WrappedMenu"
