import Lottie from "lottie-react"
import { FC, HTMLAttributes } from "react"
import { popoverStyle } from "@/components/Guide/GuidePoint/style"
import animationData from "@/components/Guide/assets/lottie/point.json"

export const GuidePoint: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div css={popoverStyle} {...props}>
      <Lottie animationData={animationData} loop={true} autoplay={true} />
    </div>
  )
}

GuidePoint.displayName = "GuidePoint"
