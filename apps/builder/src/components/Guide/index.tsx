import { Global } from "@emotion/react"
import { useTour } from "@reactour/tour"
import { FC } from "react"
import { applyGuideStyle } from "@/components/Guide/style"

export const Guide: FC = () => {
  const { setIsOpen, isOpen, currentStep } = useTour()

  return (
    <>
      <Global styles={applyGuideStyle(currentStep)} />
    </>
  )
}

Guide.displayName = "Guide"
