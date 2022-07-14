import { FC } from "react"
import { ErrorPage } from "@/page/status/errorPage"
import { Result404Icon } from "@illa-design/icon"
import { buttonStyle, iconCss } from "@/page/status/style"
import { Button } from "@illa-design/button"
import { useNavigate } from "react-router-dom"
import i18n from "@/i18n/config"

export const Page404: FC = () => {
  const navigate = useNavigate()
  return (
    <ErrorPage
      title="404"
      des={i18n.t("status.404.des")}
      img={<Result404Icon css={iconCss} />}
    >
      <div css={buttonStyle}>
        <Button onClick={() => navigate(0)} colorScheme={"gray"}>
          {i18n.t("status.404.again")}
        </Button>
        <Button onClick={() => navigate(-1)}>{i18n.t("status.back")}</Button>
      </div>
    </ErrorPage>
  )
}
