import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import { getSelectedComponentDisplayNames } from "@/redux/config/configSelector"
import { getDraggingComponentIDs } from "@/redux/currentApp/executionTree/executionSelector"
import { PositionContainerProps } from "./interface"
import { positionContainerStyle } from "./style"

export const PositionContainer: FC<PositionContainerProps> = (props) => {
  const { x, y, children, displayName } = props
  const selectedComponents = useSelector(getSelectedComponentDisplayNames)

  const draggingComponentNodes = useSelector(getDraggingComponentIDs)
  const isDragging = draggingComponentNodes.includes(displayName)
  const isSelected = useMemo(() => {
    return selectedComponents.some((currentDisplayName) => {
      return displayName === currentDisplayName
    })
  }, [displayName, selectedComponents])
  return (
    <div css={positionContainerStyle(x, y, isDragging, isSelected)}>
      {children}
    </div>
  )
}
