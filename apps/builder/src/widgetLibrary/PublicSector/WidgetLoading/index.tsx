import { FC, memo } from "react"
import { Loading } from "@illa-design/react"
import { widgetLoadingWrapperStyle } from "./style"

const WidgetLoading: FC = () => {
  return (
    <div css={widgetLoadingWrapperStyle}>
      <Loading colorScheme="techPurple" />
    </div>
  )
}

WidgetLoading.displayName = "WidgetLoading"

export default memo(WidgetLoading)
