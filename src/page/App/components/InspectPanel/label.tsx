import { FC } from "react"
import { Tooltip } from "@illa-design/tooltip"
import { useTranslation, Trans } from "react-i18next"
import { applyLabelTipsStyle, labelTipsTextStyle } from "./style"
import { PanelLabelProps } from "./interface"

export const PanelLabel: FC<PanelLabelProps> = (props) => {
  const { labelDesc, labelName, isInList } = props

  const { t } = useTranslation()

  return (
    <Tooltip
      content={
        <span css={labelTipsTextStyle}>
          <Trans style={{ color: "red", background: "red" }}>
            {t(labelDesc)}
          </Trans>
        </span>
      }
      trigger="hover"
      position="left"
      maxWidth="240px"
      disabled={!labelDesc}
    >
      <span css={applyLabelTipsStyle(isInList, !!labelDesc)}>{labelName}</span>
    </Tooltip>
  )
}

PanelLabel.displayName = "PanelLabel"
