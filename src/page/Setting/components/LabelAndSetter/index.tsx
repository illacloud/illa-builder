import {
  errorLineStyle,
  errorTextStyle,
  publicInputMarginWrapperStyle,
  publicLabelAndInputWrapperStyle,
} from "./style"
import { SettingLabel } from "@/page/Setting/components/label"
import { WarningCircleIcon } from "@illa-design/icon"
import { FC } from "react"
import { LabelAndSetterProps } from "@/page/Setting/components/LabelAndSetter/interface"

export const LabelAndSetter: FC<LabelAndSetterProps> = (props) => {
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
