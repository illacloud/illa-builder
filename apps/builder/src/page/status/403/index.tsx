import { ErrorPage } from "@/page/status/errorPage"
import { buttonStyle, iconStyle } from "@/page/status/style"
import { Result403Icon, Button } from "@illa-design/react"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

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
