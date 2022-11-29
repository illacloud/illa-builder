import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Button, Result500Icon } from "@illa-design/react"
import { ErrorPage } from "@/page/status/errorPage"
import { buttonStyle, iconStyle } from "@/page/status/style"

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
