import { FC, HTMLAttributes, ReactNode, useMemo } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  applyLinkStyle,
  applyMobileLinkStyle,
  iconStyle,
  mobileIconStyle,
} from "@/components/Menu/style"

interface MenuItem extends HTMLAttributes<HTMLDivElement> {
  selected: boolean
  index: number
  isMobile?: boolean
  path?: string
  hash?: string
  label: ReactNode
  icon?: ReactNode
  onClickMenuItem?: (index: number) => void
}

export const MenuItem: FC<MenuItem> = (props) => {
  const {
    isMobile,
    index,
    icon,
    label,
    path,
    hash = "",
    onClickMenuItem,
    onClick,
    ...rest
  } = props
  const navigate = useNavigate()
  const location = useLocation()

  const selected = location.pathname === path && location.hash === hash

  const [applyCurrentLinkStyle, currentIconStyle] = useMemo(() => {
    if (isMobile) {
      return [applyMobileLinkStyle, mobileIconStyle]
    }
    return [applyLinkStyle, iconStyle]
  }, [isMobile])

  const scrollIntoView = (hash?: string) => {
    if (!hash) return
    const targetElement = document.querySelector(hash)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div
      css={applyCurrentLinkStyle(selected)}
      key={index}
      {...rest}
      onClick={(e) => {
        onClick && onClick(e)
        onClickMenuItem && onClickMenuItem(index)
        if (!selected && path) {
          navigate({
            pathname: path,
            hash,
          })
          scrollIntoView(hash)
        }
      }}
    >
      {icon ? <div css={currentIconStyle}>{icon}</div> : null}
      {label}
    </div>
  )
}
