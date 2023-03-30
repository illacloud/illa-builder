import { MouseEvent } from "react"

export const stopDragAndDrop = (e: MouseEvent<HTMLElement>) => {
  e.stopPropagation()
}
