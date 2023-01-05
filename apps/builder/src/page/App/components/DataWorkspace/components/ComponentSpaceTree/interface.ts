import { MouseEvent } from "react"

export interface ComponentSpaceTreeProps {
  selectedKeys: string[]
  handleSelect: (selectedKeys: string[], e: MouseEvent<HTMLDivElement>) => void
}
