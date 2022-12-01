import { FC, forwardRef, useCallback, useEffect, useRef } from "react"
import { Menu } from "@illa-design/react"
import { MenuItemLabel } from "@/widgetLibrary/MenuWidget/MenuItemLabel"
import { MenuWidgetProps, WrappedMenuProps } from "./interface"

export const WrappedMenu = forwardRef<HTMLDivElement, WrappedMenuProps>(
  (props, ref) => {
    const {
      menuList,
      mode,
      horizontalAlign,
      selectedKeys,
      onClickSubMenu,
      handleOnClickMenuItem,
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
        onClickMenuItem={(key) => {
          let path = ""
          menuList?.forEach((item, index) => {
            if (item.id === key) {
              path = `menuList.${index}.events`
              return
            }
            item?.subMenu?.forEach((subItem, subIndex) => {
              if (subItem.id === key) {
                path = `menuList.${index}.subMenu.${subIndex}.events`
                return
              }
            })
          })
          new Promise((resolve) => {
            handleUpdateOriginalDSLMultiAttr({
              selectedKeys: [key],
            })
            resolve(true)
          }).then(() => {
            handleOnClickMenuItem?.(path)
          })
        }}
      >
        {menuList?.map((item) => {
          if (item.hidden) return null
          if (item.subMenu?.length) {
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
    ...rest
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
  const timeoutId = useRef<number>()
  const wrapperRef = useRef<HTMLDivElement>(null)

  const updateHeight = useCallback(() => {
    timeoutId.current = setTimeout(() => {
      if (wrapperRef.current) {
        updateComponentHeight(wrapperRef.current?.clientHeight)
      }
    }, 180)
  }, [updateComponentHeight])

  useEffect(() => {
    updateHeight()
    return () => {
      clearTimeout(timeoutId.current)
    }
  }, [mode, menuList])

  return (
    <div ref={wrapperRef}>
      <WrappedMenu
        {...rest}
        mode={mode}
        selectedKeys={selectedKeys}
        horizontalAlign={horizontalAlign}
        menuList={menuList}
        emptyState={emptyState}
        pageSize={pageSize}
        onClickSubMenu={updateHeight}
      />
    </div>
  )
}

WrappedMenu.displayName = "WrappedMenu"
