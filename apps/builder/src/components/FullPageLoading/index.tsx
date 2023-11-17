import { FC } from "react"
import { Loading } from "@illa-design/react"
import { fullPageLoadingWrapperStyle, maskStyle } from "./style"

export const FullPageLoading: FC<{ hasMask?: boolean }> = (props) => {
  return (
    <div css={fullPageLoadingWrapperStyle}>
      {props.hasMask && <div css={maskStyle} />}
      <Loading colorScheme="techPurple" />
    </div>
  )
}

FullPageLoading.displayName = "FullPageLoading"
