import { FC } from "react"
import { FxIcon } from "@illa-design/react"
import { DynamicIconProps } from "@/page/App/components/InspectPanel/PanelSetters/PublicComponent/DynamicIcon/interface"
import { applyCustomIconStyle } from "@/page/App/components/InspectPanel/PanelSetters/PublicComponent/DynamicIcon/style"

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
