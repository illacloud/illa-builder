import { FC } from "react"
import { useTranslation } from "react-i18next"
import {
  Trigger,
  WarningCircleIcon,
  globalColor,
  illaPrefix,
} from "@illa-design/react"
import { LabelNameAndDragIconProps } from "./interface"
import {
  labelNameAndDragIconWrapperStyle,
  labelNameStyle,
  selectedIconAndLabelNameWrapperStyle,
} from "./style"

export const LabelNameAndDragIcon: FC<LabelNameAndDragIconProps> = (props) => {
  const { name, isDuplicationKey } = props
  const { t } = useTranslation()
  return (
    <div css={labelNameAndDragIconWrapperStyle}>
      <div css={selectedIconAndLabelNameWrapperStyle}>
        <span css={labelNameStyle}>{name}</span>
        {isDuplicationKey && (
          <Trigger
            trigger="hover"
            showArrow={false}
            position="bottom"
            content={`${t("widget.page.path_duplicated")}`}
          >
            <WarningCircleIcon
              color={globalColor(`--${illaPrefix}-orange-03`)}
            />
          </Trigger>
        )}
      </div>
    </div>
  )
}
