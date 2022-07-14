import { FC } from "react"
import { ErrorPage } from "@/page/status/errorPage"
import { Result403Icon, Result500Icon } from "@illa-design/icon"
import { buttonStyle, iconCss } from "@/page/status/style"
import { Button } from "@illa-design/button"
import { useNavigate } from "react-router-dom"

export const Page500: FC = () => {
  const navigate = useNavigate()
  return (
    <ErrorPage
      title={"500"}
      des={"This page isn‘t working."}
      img={<Result500Icon css={iconCss} />}
    >
      <div css={buttonStyle}>
        <Button onClick={() => navigate(-1)}>back</Button>
      </div>
    </ErrorPage>
  )
}
