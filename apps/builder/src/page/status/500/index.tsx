import { FC } from "react"
import { ErrorPage } from "@/page/status/errorPage"
import { Result500Icon, Button } from "@illa-design/react"
import { buttonStyle, iconStyle } from "@/page/status/style"
import { useNavigate } from "react-router-dom"
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
