import { FC, ReactNode } from "react"
import Label from "@/widgetLibrary/PC/PublicSector/Label"
import LabelProps from "@/widgetLibrary/PC/PublicSector/Label/interface"
import { applyLabelAndComponentWrapperStyle } from "./style"

export const LabelWrapper: FC<
  LabelProps & { children: ReactNode; isSingleLine?: boolean }
> = ({ label, required, children, isSingleLine }) => {
  return (
    <div css={applyLabelAndComponentWrapperStyle(isSingleLine)}>
      <Label
        label={label}
        labelAlign="left"
        labelWidth={33}
        labelPosition={isSingleLine ? "right" : "top"}
        required={required}
      />
      {children}
    </div>
  )
}
