import { PanelLabelProps } from "./interface"
import { applyLabelTipsStyle } from "./style"
import { Text } from "@/widgetLibrary/TextWidget"
import { Trigger } from "@illa-design/react"
import { FC, memo } from "react"

export const PanelLabel: FC<PanelLabelProps> = memo(
  (props: PanelLabelProps) => {
    const { labelDesc, labelName, isInList } = props

    return (
      <Trigger
        content={<Text value={labelDesc} colorScheme="white" />}
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
