import { FC } from "react"
import { useTranslation } from "react-i18next"
import {
  unselectedTipIconStyle,
  unselectedTipTextStyle,
  unselectedTipWrapperStyle,
} from "@/page/App/components/InspectPanel/style"
import { UnselectedWidgetIcon } from "@illa-design/icon"

export const Empty: FC = () => {
  const { t } = useTranslation()
  return (
    <div css={unselectedTipWrapperStyle}>
      <div css={unselectedTipIconStyle}>
        <UnselectedWidgetIcon />
      </div>
      <div css={unselectedTipTextStyle}>
        {t("editor.inspect.unselected_tip1")}
      </div>
      <div css={unselectedTipTextStyle}>
        {t("editor.inspect.unselected_tip2")}
      </div>
    </div>
  )
}

Empty.displayName = "Unselected-empty"
