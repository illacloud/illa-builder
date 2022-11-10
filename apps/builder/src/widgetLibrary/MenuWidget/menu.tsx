import { FC, forwardRef, useCallback, useEffect, useRef } from "react"
import { Menu } from "@illa-design/menu"
import { MenuWidgetProps, WrappedMenuProps } from "./interface"
import { MenuItemLabel } from "@/widgetLibrary/MenuWidget/MenuItemLabel"

export const WrappedMenu = forwardRef<HTMLDivElement, WrappedMenuProps>(
  (props, ref) => {
    const {
      menuList,
      mode,
      horizontalAlign,
      selectedKeys,
      onClickSubMenu,
      handleUpdateOriginalDSLMultiAttr,
    } = props
    const { Item, SubMenu } = Menu

    return (
      <Menu
        mode={mode}
        ref={ref}
        selectedKeys={selectedKeys}
        horizontalAlign={horizontalAlign}
        onClickSubMenu={onClickSubMenu}
        onClickMenuItem={(value) => {
          handleUpdateOriginalDSLMultiAttr({
            selectedKeys: value,
          })
        }}
      >
        {menuList?.map((item) => {
          if (item.hidden) return null
          if (item.subMenu) {
            return (
              <SubMenu
                key={item.id}
                title={<MenuItemLabel title={item.title} icon={item.icon} />}
              >
                {item.subMenu.map((subItem) => {
                  if (subItem.hidden) return null
                  return (
                    <Item
                      key={subItem.id}
                      title={
                        <MenuItemLabel
                          title={subItem.title}
                          icon={subItem.icon}
                        />
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
    selectedKeys,
    pageSize,
    displayName,
    horizontalAlign,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    updateComponentHeight,
    handleUpdateOriginalDSLMultiAttr,
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

  const updateHeight = useCallback(() => {
    if (wrapperRef.current) {
      updateComponentHeight(wrapperRef.current?.clientHeight)
    }
  }, [updateComponentHeight])

  useEffect(() => {
    updateHeight()
  }, [mode, updateHeight])

  return (
    <div ref={wrapperRef}>
      <WrappedMenu
        mode={mode}
        selectedKeys={selectedKeys}
        horizontalAlign={horizontalAlign}
        menuList={menuList}
        emptyState={emptyState}
        pageSize={pageSize}
        handleUpdateOriginalDSLMultiAttr={handleUpdateOriginalDSLMultiAttr}
        onClickSubMenu={() => {
          setTimeout(() => {
            updateHeight()
          }, 180)
        }}
      />
    </div>
  )
}

WrappedMenu.displayName = "WrappedMenu"
