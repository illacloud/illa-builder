import { FC } from "react"
import { useTranslation } from "react-i18next"
import {
  unselectedTipIconStyle,
  unselectedTipTextStyle,
  unselectedTipWrapperStyle,
} from "@/page/App/components/InspectPanel/style"
import { ReactComponent as NoComponentSelected } from "@/assets/no-component-selected-icon.svg"
import { Empty } from "@illa-design/empty"

export const EmptySelected: FC = () => {
  const { t } = useTranslation()
  return (
    <div css={unselectedTipWrapperStyle}>
      <Empty
        icon={
          <div css={unselectedTipIconStyle}>
            <NoComponentSelected />
          </div>
        }
        description={
          <>
            <div css={unselectedTipTextStyle}>
              {t("editor.inspect.unselected_tip1")}
            </div>
            <div css={unselectedTipTextStyle}>
              {t("editor.inspect.unselected_tip2")}
            </div>
          </>
        }
      />
    </div>
  )
}

EmptySelected.displayName = "EmptySelected"
