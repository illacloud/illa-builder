import { FC, useEffect } from "react"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  ILLA_MIXPANEL_PUBLIC_PAGE_NAME,
} from "@/illa-public-component/MixpanelUtils/interface"
import { ErrorPageProps } from "@/page/status/interface"
import { errorPageStyle } from "@/page/status/style"
import { track } from "@/utils/mixpanelHelper"

export const ErrorPage: FC<ErrorPageProps> = (props) => {
  const { title, des, img, children } = props
  useEffect(() => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.VISIT,
      ILLA_MIXPANEL_PUBLIC_PAGE_NAME.ERROR_PAGE,
      {
        parameter3: title,
      },
    )
  }, [title])
  return (
    <div css={errorPageStyle}>
      {img}
      <span> {title} </span>
      <span>{des}</span>
      {children}
    </div>
  )
}
