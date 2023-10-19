import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Button, Result500Icon } from "@illa-design/react"
import { buttonStyle, errorPageStyle, iconStyle } from "@/page/status/style"

export const Status500: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div css={errorPageStyle}>
      <Result500Icon css={iconStyle} />
      <span>500</span>
      <span>{t("status.500.des")}</span>
      <div css={buttonStyle}>
        <Button onClick={() => navigate(0)} colorScheme={"gray"}>
          {t("error_page.again")}
        </Button>
        <Button onClick={() => navigate("/")} colorScheme="techPurple">
          {t("status.back")}
        </Button>
      </div>
    </div>
  )
}
