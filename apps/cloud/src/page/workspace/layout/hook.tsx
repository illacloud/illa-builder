import { UIEvent, useState } from "react"

export const useDividerLine = (): [boolean, (e: UIEvent) => void] => {
  const [dividerShow, setDividerShow] = useState(false)

  const onContainerScroll = (e: UIEvent) => {
    const target = e.target as HTMLDivElement
    if (target.scrollTop >= 24) {
      setDividerShow(true)
    } else {
      setDividerShow(false)
    }
  }
  return [dividerShow, onContainerScroll]
}
