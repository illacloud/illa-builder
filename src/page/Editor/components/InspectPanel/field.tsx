import { FC } from "react"
import { PanelFieldProps } from "./interface"
import { singleInputCss, singleSetterCss } from "./style"
import PanelLabel from "./label"
import { parserSetter } from "./utils/parserSetter"

const PanelField: FC<PanelFieldProps> = (props) => {
    const { labelName, labelDesc, setterType } = props

  return (
    <div css={singleSetterCss}>
      <div>
        <PanelLabel labelName={labelName} labelDesc={labelDesc} />
      </div>
      <div css={singleInputCss}>{parserSetter(setterType)}</div>
    </div>
  )
}

export default PanelField
