import { FC } from "react"
import { ErrorPage } from "@/page/status/errorPage"
import { Result404Icon } from "@illa-design/icon"
import { buttonStyle, iconCss } from "@/page/status/style"
import { Button } from "@illa-design/button"
import { useNavigate } from "react-router-dom"

export const Page404: FC = () => {
  const navigate = useNavigate()
  return (
    <ErrorPage
      title={"404"}
      des={"Whoops,that page is gone."}
      img={<Result404Icon css={iconCss} />}
    >
      <div css={buttonStyle}>
        <Button colorScheme={"gray"}>Again</Button>
        <Button onClick={() => navigate(-1)}>back</Button>
      </div>
    </ErrorPage>
  )
}
