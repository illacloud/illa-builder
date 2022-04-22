import { FC, HTMLAttributes } from "react"

interface PageNavBarProps extends HTMLAttributes<HTMLDivElement> {}

export const PageNavBar: FC<PageNavBarProps> = (props) => {
  const { className } = props

  return <div className={className}>PageNavBar</div>
}

PageNavBar.displayName = "PageNavBar"
