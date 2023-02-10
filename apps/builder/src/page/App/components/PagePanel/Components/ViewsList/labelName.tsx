import { FC } from "react"
import { useTranslation } from "react-i18next"
import {
  DragPointIcon,
  Trigger,
  WarningCircleIcon,
  globalColor,
  illaPrefix,
} from "@illa-design/react"
import { LabelNameAndDragIconProps } from "./interface"
import {
  labelNameAndDragIconWrapperStyle,
  labelNameStyle,
  moveIconStyle,
  selectedIconAndLabelNameWrapperStyle,
  selectedIconStyle,
} from "./style"

export const LabelNameAndDragIcon: FC<LabelNameAndDragIconProps> = (props) => {
  const { name, isDuplicationKey, isSelected, index, handleChangSectionView } =
    props
  const { t } = useTranslation()
  return (
    <div css={labelNameAndDragIconWrapperStyle}>
      <DragPointIcon css={moveIconStyle} className="dragIcon" />
      <div css={selectedIconAndLabelNameWrapperStyle}>
        <div
          css={selectedIconStyle(isSelected)}
          onClick={(e) => {
            e.stopPropagation()
            handleChangSectionView(index)
          }}
        />
        <span css={labelNameStyle}>{name}</span>
        {isDuplicationKey && (
          <Trigger
            trigger="hover"
            showArrow={false}
            position="bottom"
            content={`${t("widget.container.key_duplicated")}`}
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
