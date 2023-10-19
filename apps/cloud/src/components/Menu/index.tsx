import { FC, useMemo } from "react"
import { useLocation } from "react-router-dom"
import { MenuProps } from "@/components/Menu/interface"
import {
  menuWrapperStyle,
  mobileMenuWrapperStyle,
  subMenuWrapperStyle,
} from "@/components/Menu/style"
import { MenuItem } from "./menuItem"

export const Menu: FC<MenuProps> = (props) => {
  const {
    containerClassName,
    itemClassName,
    itemList,
    isMobile,
    onClickMenuItem,
  } = props
  const location = useLocation()

  const wrapperStyle = useMemo(() => {
    if (isMobile) {
      return mobileMenuWrapperStyle
    }
    return menuWrapperStyle
  }, [isMobile])

  return (
    <div css={wrapperStyle} className={containerClassName}>
      {itemList?.map((item, index) => {
        const { path, hash = "", hidden, subMenu, ...rest } = item
        const selected = location.pathname === path && location.hash === hash

        if (hidden) {
          return null
        }

        return (
          <div key={path + hash}>
            <MenuItem
              {...rest}
              isMobile={isMobile}
              selected={selected}
              index={index}
              path={path}
              hash={hash}
              className={itemClassName}
              onClickMenuItem={onClickMenuItem}
            />
            {subMenu?.map((item, index) => {
              const { path, hash = "", hidden, ...subProps } = item
              const selected =
                location.pathname === path && location.hash === hash

              if (hidden) {
                return null
              }
              return (
                <MenuItem
                  css={subMenuWrapperStyle}
                  key={path + hash}
                  {...subProps}
                  isMobile={isMobile}
                  selected={selected}
                  index={index}
                  path={path}
                  hash={hash}
                  className={itemClassName}
                  onClickMenuItem={onClickMenuItem}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

Menu.displayName = "Menu"
