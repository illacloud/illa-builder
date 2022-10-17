import { FC, HTMLAttributes, useState } from "react"
import { Loading } from "@illa-design/loading"
import { loadingStyle, contentStyle } from "@/page/App/style"
import {
  leftAnimationStyle,
  rightAnimationStyle,
  navStyle,
  containerStyle,
} from "./style"

export const AppLoading: FC<HTMLAttributes<HTMLDivElement>> = () => {
  const [showLoading, setShowLoading] = useState<boolean>()

  return (
    <div css={containerStyle}>
      <div css={navStyle} />
      <div css={contentStyle}>
        <div
          css={leftAnimationStyle}
          onAnimationEnd={() => {
            setShowLoading(true)
          }}
        />
        <div css={loadingStyle}>
          {showLoading ? <Loading colorScheme="techPurple" /> : null}
        </div>
        <div css={rightAnimationStyle} />
      </div>
    </div>
  )
}

AppLoading.displayName = "AppLoading"
