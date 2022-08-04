import { FC } from "react"
import {
  layoutStyle,
  layoutWrapperStyle,
} from "@/page/Setting/components/Layout/style"

export const SettingLayout: FC = (props) => {
  const { children } = props
  return (
    <div css={layoutWrapperStyle}>
      <div css={layoutStyle}>{children}</div>
    </div>
  )
}
