import { FC } from "react"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import { WatermarkProps } from "@/page/Deploy/Watermark/interface"
import { deployLogoStyle, logoStyle } from "./style"

export const WaterMark: FC<WatermarkProps> = () => {
  return (
    <div
      css={deployLogoStyle}
      onClick={() => {
        window.open("https://illacloud.com", "_blank")
      }}
    >
      <span>Powered by</span>
      <Logo css={logoStyle} />
    </div>
  )
}

WaterMark.displayName = "WaterMark"
