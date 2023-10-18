import { FC, memo } from "react"
import { Trigger } from "@illa-design/react"
import { ILLAMarkdown } from "@/components/ILLAMarkdown"
import { PanelLabelProps } from "./interface"
import { applyLabelTipsStyle } from "./style"

export const PanelLabel: FC<PanelLabelProps> = memo(
  (props: PanelLabelProps) => {
    const { labelDesc, labelName, labelSize = "medium" } = props

    return !labelDesc ? (
      <span css={applyLabelTipsStyle(!!labelDesc, labelSize)}>{labelName}</span>
    ) : (
      <Trigger
        content={<ILLAMarkdown textString={labelDesc} />}
        trigger="hover"
        position="left"
        maxW="240px"
        disabled={!labelDesc}
      >
        <span css={applyLabelTipsStyle(!!labelDesc, labelSize)}>
          {labelName}
        </span>
      </Trigger>
    )
  },
)

PanelLabel.displayName = "PanelLabel"
