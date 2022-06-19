import { FC } from "react"
import { Tooltip } from "@illa-design/tooltip"
import { applyLabelStyle, applyLabelTipsStyle, labelTipsCss } from "./style"
import { PanelLabelProps } from "./interface"

export const PanelLabel: FC<PanelLabelProps> = (props) => {
  const { labelDesc, labelName, isInList } = props

  return (
    <>
      {labelDesc ? (
        <Tooltip
          content={labelDesc}
          trigger="hover"
          position="left"
          maxWidth="240px"
        >
          <span css={applyLabelTipsStyle(isInList)}>{labelName}</span>
        </Tooltip>
      ) : (
        <span css={applyLabelStyle(isInList)}>{labelName}</span>
      )}
    </>
  )
}

PanelLabel.displayName = "PanelLabel"
