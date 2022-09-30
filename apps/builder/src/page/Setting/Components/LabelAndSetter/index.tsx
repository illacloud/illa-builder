import { FC } from "react"
import { SettingLabel } from "@/page/Setting/Components/label"
import { WarningCircleIcon } from "@illa-design/icon"
import { LabelAndSetterProps } from "@/page/Setting/Components/LabelAndSetter/interface"
import {
  errorLineStyle,
  errorTextStyle,
  publicInputMarginWrapperStyle,
  publicLabelAndInputWrapperStyle,
} from "@/page/Setting/Components/LabelAndSetter/style"

export const LabelAndSetter: FC<LabelAndSetterProps> = props => {
  const { children, errorMessage, label } = props
  return (
    <div css={publicLabelAndInputWrapperStyle}>
      <SettingLabel label={label} />
      <div css={publicInputMarginWrapperStyle}>
        {children}
        {errorMessage && (
          <div css={errorLineStyle}>
            <WarningCircleIcon />
            <span css={errorTextStyle}>{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  )
}

LabelAndSetter.displayName = "LabelAndSetter"
