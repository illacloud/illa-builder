import { FC, memo } from "react"
import { Trigger, Text } from "@illa-design/react"
import { PanelLabelProps } from "./interface"
import { applyLabelTipsStyle } from "./style"

export const PanelLabel: FC<PanelLabelProps> = memo(
  (props: PanelLabelProps) => {
    const { labelDesc, labelName, isInList } = props

    return (
      <Trigger
        content={<Text colorScheme="white">{labelDesc}</Text>}
        trigger="hover"
        position="left"
        maxW="240px"
        disabled={!labelDesc}
      >
        <span css={applyLabelTipsStyle(isInList, !!labelDesc)}>
          {labelName}
        </span>
      </Trigger>
    )
  },
)

PanelLabel.displayName = "PanelLabel"
