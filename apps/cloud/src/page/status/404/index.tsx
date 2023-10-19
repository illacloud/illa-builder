import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Button, Result404Icon } from "@illa-design/react"
import { buttonStyle, errorPageStyle, iconStyle } from "@/page/status/style"

export const Status404: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <div css={errorPageStyle}>
      <Result404Icon css={iconStyle} />
      <span>404</span>
      <span>{t("error_page.not_found")}</span>
      <div css={buttonStyle}>
        <Button onClick={() => navigate(0)} colorScheme={"gray"}>
          {t("error_page.again")}
        </Button>
        <Button onClick={() => navigate("/")} colorScheme="techPurple">
          {t("error_page.back")}
        </Button>
      </div>
    </div>
  )
}
