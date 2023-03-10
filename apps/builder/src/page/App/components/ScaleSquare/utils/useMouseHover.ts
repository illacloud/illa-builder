import { MouseEvent, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getHoveredComponents } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"

export const useMouseHover = () => {
  const hoveredComponents = useSelector(getHoveredComponents)
  const dispatch = useDispatch()

  const handleMouseEnter = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const currentDisplayName =
        e.currentTarget.getAttribute("data-displayName")
      if (!currentDisplayName) return
      const newHoveredComponents = [...hoveredComponents, currentDisplayName]
      dispatch(configActions.updateHoveredComponent(newHoveredComponents))
    },
    [dispatch, hoveredComponents],
  )

  const handleMouseLeave = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const currentDisplayName =
        e.currentTarget.getAttribute("data-displayName")
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
