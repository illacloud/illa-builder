import Lottie from "lottie-react"
import { FC } from "react"
import animationData from "@/components/Guide/assets/lottie/success.json"

export const GuideSuccess: FC = () => {
  // add lottie react component

  return (
    <div>
      <Lottie animationData={animationData} loop={false} autoplay={true} />
    </div>
  )
}
