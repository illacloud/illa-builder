import { FC } from "react"
import { Tooltip } from "@illa-design/tooltip"
import { baseLabelCss, labelTipsCss } from "./style"
import { PanelLabelProps } from "./interface"

const PanelLabel: FC<PanelLabelProps> = (props) => {
  const { labelDesc, labelName } = props

  return (
    <>
      {labelDesc ? (
        <Tooltip content={labelDesc} trigger="hover">
          <span css={labelTipsCss}>{labelName}</span>
        </Tooltip>
      ) : (
        <span css={baseLabelCss}>{labelName}</span>
      )}
    </>
  )
}

export default PanelLabel
