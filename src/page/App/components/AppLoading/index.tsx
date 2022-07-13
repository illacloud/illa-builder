import { FC, HTMLAttributes, useState } from "react"
import { css } from "@emotion/react"
import { leftPanelStyle, rightPanelStyle, navStyle } from "./style"
import { Loading } from "@illa-design/loading"
import { loadingStyle, contentStyle } from "@/page/App/style"

export const AppLoading: FC<HTMLAttributes<HTMLDivElement>> = () => {
  const [showLoading, setShowLoading] = useState<boolean>()

  return (
    <div css={loadingStyle}>
      <div css={navStyle} />
      <div css={contentStyle}>
        <div
          css={leftPanelStyle}
          onAnimationEnd={() => {
            setShowLoading(true)
          }}
        />
        <div css={loadingStyle}>
          {showLoading ? <Loading colorScheme="techPurple" /> : null}
        </div>
        <div css={rightPanelStyle} />
      </div>
    </div>
  )
}

AppLoading.displayName = "AppLoading"
