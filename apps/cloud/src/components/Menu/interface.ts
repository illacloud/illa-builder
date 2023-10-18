import { HTMLAttributes, ReactNode } from "react"

export interface MenuItems {
  subMenu?: MenuItems[]
  path?: string
  hash?: string
  label: ReactNode
  icon?: ReactNode
  hidden?: boolean
  onClick?: () => void
}

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  itemList: MenuItems[]
  isMobile?: boolean
  containerClassName?: string
  itemClassName?: string
  onClickMenuItem?: (index: number) => void
}
