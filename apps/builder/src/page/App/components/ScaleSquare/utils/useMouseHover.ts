import { MouseEvent, useCallback, useContext, useEffect } from "react"
import { useDragDropManager } from "react-dnd"
import { useDispatch } from "react-redux"
import { MouseHoverContext } from "@/page/App/components/DotPanel/context/mouseHoverContext"
import { configActions } from "@/redux/config/configSlice"

export const useMouseHover = () => {
  const dragDropManager = useDragDropManager()
  const isDragging = dragDropManager.getMonitor().isDragging()
  const dispatch = useDispatch()
  const hoverContext = useContext(MouseHoverContext)

  useEffect(() => {
    if (isDragging) {
      hoverContext.hoveredWidgets.length > 0 &&
        dispatch(configActions.updateHoveredComponent([]))
    }
  }, [dispatch, hoverContext.hoveredWidgets.length, isDragging])

  const handleMouseEnter = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (isDragging) return
      const currentDisplayName =
        e.currentTarget.getAttribute("data-displayname")
      if (!currentDisplayName) return
      hoverContext.addHoverWidget(currentDisplayName)
    },
    [hoverContext, isDragging],
  )

  const handleMouseLeave = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const currentDisplayName =
        e.currentTarget.getAttribute("data-displayname")
      if (!currentDisplayName) return
      hoverContext.deleteHoverWidget(currentDisplayName)
    },
    [hoverContext],
  )

  return {
    handleMouseEnter,
    handleMouseLeave,
  }
}
