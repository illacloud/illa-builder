import { hasDynamicStringSnippet } from "@illa-public/dynamic-string"
import { FC, useContext, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  BoxProps,
  CloseIcon,
  WarningIcon,
  applyBoxStyle,
  getColor,
} from "@illa-design/react"
import { getSelectedAction } from "@/redux/config/configSelector"
import { SQLModeTipContext } from "../../../Context/SqlModeTipContext"
import {
  iconStyle,
  modeTipContainerStyle,
  modeTipContentStyle,
  modeTipHeaderStyle,
  titleStyle,
  warnIconStyle,
} from "./style"

interface SQLModeTipProps extends BoxProps {
  value: string
}

const SQLModeTip: FC<SQLModeTipProps> = ({ value, ...styleProps }) => {
  const { t } = useTranslation()
  const { showSQLModeTip, setShowSQLModeTip } = useContext(SQLModeTipContext)
  const selectedAction = useSelector(getSelectedAction)! ?? {}
  const hasDynamicString = hasDynamicStringSnippet(value)
  const showCurrentActionTip = showSQLModeTip[selectedAction.actionID]

  const handleClose = () => {
    setShowSQLModeTip(selectedAction.actionID, false)
  }

  const show = useMemo(() => {
    if (hasDynamicString && showCurrentActionTip === undefined) return true
    return hasDynamicString && showCurrentActionTip
  }, [showCurrentActionTip, hasDynamicString])

  if (!show) return null
  return (
    <div css={[modeTipContainerStyle, applyBoxStyle(styleProps)]}>
      <div css={modeTipHeaderStyle}>
        <span css={warnIconStyle}>
          <WarningIcon color={getColor("white", "01")} size="16px" />
        </span>
        <span css={titleStyle}>
          {t("editor.action.panel.label.tips.title.safe_mode")}
        </span>
        <span css={iconStyle} onClick={handleClose}>
          <CloseIcon color={getColor("orange", "03")} size="8px" />
        </span>
      </div>
      <div css={modeTipContentStyle}>
        {t("editor.action.panel.label.tips.desc.safe_mode")}
      </div>
    </div>
  )
}

export default SQLModeTip
