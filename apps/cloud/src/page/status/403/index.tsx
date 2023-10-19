import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useSearchParams } from "react-router-dom"
import { Button, Result404Icon } from "@illa-design/react"
import { buttonStyle, errorPageStyle, iconStyle } from "@/page/status/style"

export const Status403: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()

  const handleClickAgain = () => {
    const redirectURL = searchParams.get("redirectURL")
    if (redirectURL) {
      window.location.href = decodeURIComponent(redirectURL)
    } else {
      navigate("/")
    }
  }
  return (
    <div css={errorPageStyle}>
      <Result404Icon css={iconStyle} />
      <span>403</span>
      <span>{t("error_page.fobidden")}</span>
      <div css={buttonStyle}>
        <Button onClick={handleClickAgain} colorScheme={"gray"}>
          {t("error_page.again")}
        </Button>
        <Button onClick={() => navigate("/")} colorScheme="techPurple">
          {t("error_page.back")}
        </Button>
      </div>
    </div>
  )
}
