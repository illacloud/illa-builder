import { FC, ReactNode } from "react"
import { useWindowSize } from "react-use"
import { MobileForbidden } from "@/page/status/MobileFobidden"
import { isMobileByWindowSize } from "@/utils/screen"

interface LayoutAutoChangeProps {
  desktopPage: ReactNode
}

export const LayoutAutoChange: FC<LayoutAutoChangeProps> = (props) => {
  const { desktopPage } = props
  const { width } = useWindowSize()
  const isMobile = isMobileByWindowSize(width)
  return <>{isMobile ? <MobileForbidden /> : desktopPage}</>
}
