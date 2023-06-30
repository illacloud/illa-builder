import { RefObject } from "react"

const scrollBarContainerController = new Map<
  string,
  RefObject<HTMLDivElement>
>()

export const setScrollBarContainerController = (
  displayName: string,
  ref: RefObject<HTMLDivElement>,
) => {
  scrollBarContainerController.set(displayName, ref)
}

export const removeScrollBarContainerControllerByDisplayName = (
  displayName: string,
) => {
  scrollBarContainerController.delete(displayName)
}

export const clearScrollBarContainerController = () => {
  scrollBarContainerController.clear()
}

export const getScrollBarContainerByDisplayName = (displayName: string) => {
  return scrollBarContainerController.get(displayName)
}
