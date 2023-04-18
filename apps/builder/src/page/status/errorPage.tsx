import { FC } from "react"
import { ErrorPageProps } from "@/page/status/interface"
import { errorPageStyle } from "@/page/status/style"

export const ErrorPage: FC<ErrorPageProps> = (props) => {
  const { title, des, img, children } = props
  return (
    <div css={errorPageStyle}>
      {img}
      <span> {title} </span>
      <span>{des}</span>
      {children}
    </div>
  )
}
