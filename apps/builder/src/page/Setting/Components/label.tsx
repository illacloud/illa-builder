import { FC } from "react"
import { LabelProps } from "@/page/Setting/components/interface"
import {
  labelExtInfoStyles,
  labelStyles,
} from "@/page/Setting/components/style"

export const SettingLabel: FC<LabelProps> = (props) => {
  const { label, extInfo } = props

  return (
    <div>
      <span css={labelStyles}>{label}</span>

      {extInfo && <span css={labelExtInfoStyles}> {extInfo}</span>}
    </div>
  )
}
SettingLabel.displayName = "SettingLabel"
