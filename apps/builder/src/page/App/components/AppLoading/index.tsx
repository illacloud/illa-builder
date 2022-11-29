import {
  leftAnimationStyle,
  rightAnimationStyle,
  navStyle,
  containerStyle,
} from "./style"
import { loadingStyle, contentStyle } from "@/page/App/style"
import { Loading } from "@illa-design/react"
import { FC, HTMLAttributes, useState } from "react"

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
