import { FC } from "react"
import { ErrorPage } from "@/page/status/errorPage"
import { Result500Icon } from "@illa-design/icon"
import { buttonStyle, iconStyle } from "@/page/status/style"
import { Button } from "@illa-design/button"
import { useNavigate } from "react-router-dom"
import i18n from "@/i18n/config"
import { useTranslation } from "react-i18next"

export const Page500: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <ErrorPage
      title="500"
      des={t("status.500.des")}
      img={<Result500Icon css={iconStyle} />}
    >
      <div css={buttonStyle}>
        <Button onClick={() => navigate("/")}>{t("status.back")}</Button>
      </div>
    </ErrorPage>
  )
}
