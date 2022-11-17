import { FC } from "react"
import { ErrorPage } from "@/page/status/errorPage"
import { Result403Icon } from "@illa-design/icon"
import { buttonStyle, iconStyle } from "@/page/status/style"
import { Button } from "@illa-design/button"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

export const Page403: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <ErrorPage
      title="403"
      des={t("status.403.des")}
      img={<Result403Icon css={iconStyle} />}
    >
      <div css={buttonStyle}>
        <Button onClick={() => navigate("/")}>{t("status.back")}</Button>
      </div>
    </ErrorPage>
  )
}
