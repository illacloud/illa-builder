import Lottie from "lottie-react"
import { FC, useState } from "react"
import { createPortal } from "react-dom"
import { popoverStyle } from "@/components/Guide/GuideSuccess/style"
import animationData from "@/components/Guide/assets/lottie/success.json"

export const GuideSuccess: FC = () => {
  const [showAnimation, setShowAnimation] = useState(true)

  const handleAnimationComplete = () => {
    setShowAnimation(false)
  }

  return showAnimation
    ? createPortal(
        <div css={popoverStyle}>
          <Lottie
            animationData={animationData}
            loop={false}
            autoplay={true}
            onComplete={handleAnimationComplete}
          />
        </div>,
        document.body,
      )
    : null
}

GuideSuccess.displayName = "GuideSuccess"
