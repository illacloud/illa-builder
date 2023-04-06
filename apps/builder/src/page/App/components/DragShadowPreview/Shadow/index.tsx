import { motion } from "framer-motion"
import { FC, useCallback } from "react"
import { useDispatch } from "react-redux"
import { dragShadowActions } from "@/redux/currentApp/dragShadow/dragShadowSlice"
import { UNIT_HEIGHT } from "../../DotPanel/renderComponentCanvas"
import { applyDotLintRectangleStyle, rectangleStyle } from "./style"

interface DragShadowPreviewProps {
  x: number
  y: number
  landingX: number
  landingY: number
  unitW: number
  status: number
  parentDisplayName: string
  displayNames: string
  userID: string
}

export const ShadowPreview: FC<DragShadowPreviewProps> = (props) => {
  const {
    x,
    y,
    landingX,
    landingY,
    status,
    userID,
    unitW,
    displayNames,
    parentDisplayName,
  } = props

  const dispatch = useDispatch()

  const onAnimationComplete = useCallback(() => {
    if (status === -1) {
      dispatch(dragShadowActions.deleteDragShadowInfoReducer(userID))
    } else {
      dispatch(
        dragShadowActions.removeAnimationEndDragShadowInfoReducer(userID),
      )
    }
  }, [dispatch, status, userID])

  return (
    <>
      <motion.div
        css={applyDotLintRectangleStyle(
          landingX * unitW,
          landingY * UNIT_HEIGHT,
          true,
        )}
        initial={{ x: x * unitW, y: y * UNIT_HEIGHT }}
        animate={{ x: x * unitW, y: y * UNIT_HEIGHT }}
        transition={{ duration: 0.16 }}
        onAnimationComplete={onAnimationComplete}
      >
        <div css={rectangleStyle} />
      </motion.div>
    </>
  )
}
