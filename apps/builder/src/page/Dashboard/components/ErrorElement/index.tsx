import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useRevalidator } from "react-router-dom"
import { Button, CloseIcon } from "@illa-design/react"
import {
  errorBodyStyle,
  errorDescriptionStyle,
  errorIconColorStyle,
  errorIconContentStyle,
  errorTitleStyle,
} from "./style"

export const DashboardErrorElement: FC = () => {
  const { t } = useTranslation()
  const revalidator = useRevalidator()

  return (
    <div css={errorBodyStyle}>
      <div css={errorIconContentStyle}>
        <CloseIcon size="16px" css={errorIconColorStyle} />
      </div>
      <div css={errorTitleStyle}>{t("dashboard.common.error_title")}</div>
      <div css={errorDescriptionStyle}>
        {t("dashboard.common.error_description")}
      </div>
      <Button
        colorScheme="techPurple"
        onClick={() => {
          revalidator.revalidate()
        }}
      >
        {t("dashboard.common.error_button")}
      </Button>
    </div>
  )
}
