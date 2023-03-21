import { MouseEvent, useCallback, useEffect } from "react"
import { useDragDropManager } from "react-dnd"
import { useDispatch } from "react-redux"
import { getHoveredComponents } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import store from "@/store"

export const useMouseHover = () => {
  const dragDropManager = useDragDropManager()
  const isDragging = dragDropManager.getMonitor().isDragging()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isDragging) {
      dispatch(configActions.updateHoveredComponent([]))
    }
    return () => {
      dispatch(configActions.updateHoveredComponent([]))
    }
  }, [dispatch, isDragging])

  const handleMouseEnter = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (isDragging) return
      const currentDisplayName =
        e.currentTarget.getAttribute("data-displayname")
      if (!currentDisplayName) return
      const rootState = store.getState()
      const hoveredComponents = getHoveredComponents(rootState)

      const newHoveredComponents = Array.from(
        new Set([...hoveredComponents, currentDisplayName]),
      )
      dispatch(configActions.updateHoveredComponent(newHoveredComponents))
    },
    [dispatch, isDragging],
  )

  const handleMouseLeave = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const currentDisplayName =
        e.currentTarget.getAttribute("data-displayname")
      if (!currentDisplayName) return
      const rootState = store.getState()
      const hoveredComponents = getHoveredComponents(rootState)
      const newHoveredComponents = hoveredComponents.filter(
        (hDisplayName) => hDisplayName !== currentDisplayName,
      )
      dispatch(configActions.updateHoveredComponent(newHoveredComponents))
    },
    [dispatch],
  )

  return {
    handleMouseEnter,
    handleMouseLeave,
  }
}
