import { FC, ReactNode } from "react"
import {
  layoutStyle,
  layoutWrapperStyle,
} from "@/page/Setting/Components/Layout/style"

interface ISettingLayoutProps {
  children: ReactNode
}
export const SettingLayout: FC<ISettingLayoutProps> = (props) => {
  const { children } = props
  return (
    <div css={layoutWrapperStyle}>
      <div css={layoutStyle}>{children}</div>
    </div>
  )
}
