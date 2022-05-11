import { FC } from "react"
import { PanelFieldProps } from "./interface"
import { Input } from "@illa-design/input"
import { singleInputCss, singleSetterCss } from "./style"
import PanelLabel from "./label"

const PanelField: FC<PanelFieldProps> = (props) => {
  const { labelName, labelDesc } = props

  return (
    <div css={singleSetterCss}>
      <div>
        <PanelLabel labelName={labelName} labelDesc={labelDesc} />
      </div>
      <div css={singleInputCss}>
        <Input />
      </div>
    </div>
  )
}

export default PanelField
