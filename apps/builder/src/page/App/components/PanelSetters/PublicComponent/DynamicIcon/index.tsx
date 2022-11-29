import { DynamicIconProps } from "@/page/App/components/PanelSetters/PublicComponent/DynamicIcon/interface"
import { applyCustomIconStyle } from "@/page/App/components/PanelSetters/PublicComponent/DynamicIcon/style"
import { FxIcon } from "@illa-design/react"
import { FC } from "react"

export const DynamicIcon: FC<DynamicIconProps> = (props) => {
  const { isDynamic, hasRightContent, onClick } = props
  return (
    <div
      css={applyCustomIconStyle(isDynamic, hasRightContent)}
      onClick={onClick}
    >
      <FxIcon />
    </div>
  )
}
