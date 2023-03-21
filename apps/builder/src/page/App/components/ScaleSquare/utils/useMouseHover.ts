import { MouseEvent, useCallback, useEffect } from "react"
import { useDragDropManager } from "react-dnd"
import { useDispatch, useSelector } from "react-redux"
import { getHoveredComponents } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"

export const useMouseHover = () => {
  const hoveredComponents = useSelector(getHoveredComponents)
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
      const newHoveredComponents = [...hoveredComponents, currentDisplayName]
      dispatch(configActions.updateHoveredComponent(newHoveredComponents))
    },
    [dispatch, hoveredComponents, isDragging],
  )

  const handleMouseLeave = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const currentDisplayName =
        e.currentTarget.getAttribute("data-displayname")
      if (!currentDisplayName) return

      const newHoveredComponents = hoveredComponents.filter(
        (hDisplayName) => hDisplayName !== currentDisplayName,
      )
      dispatch(configActions.updateHoveredComponent(newHoveredComponents))
    },
    [dispatch, hoveredComponents],
  )

  return {
    handleMouseEnter,
    handleMouseLeave,
  }
}
