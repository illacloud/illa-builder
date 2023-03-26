import Lottie from "lottie-react"
import { FC } from "react"
import { popoverStyle } from "@/components/Guide/GuideSuccess/style"
import animationData from "@/components/Guide/assets/lottie/point.json"

export const GuidePoint: FC = () => {
  return (
    <div css={popoverStyle}>
      <Lottie animationData={animationData} loop={true} autoplay={true} />
    </div>
  )
}

GuidePoint.displayName = "GuidePoint"
