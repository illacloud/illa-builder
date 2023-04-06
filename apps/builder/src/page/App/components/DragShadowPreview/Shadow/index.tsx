import { motion } from "framer-motion"
import { FC, useCallback } from "react"
import { useDispatch } from "react-redux"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import { FixedCursor } from "@/page/App/components/MousePreview/Cursor"
import { dragShadowActions } from "@/redux/currentApp/dragShadow/dragShadowSlice"
import { applyDotLintRectangleStyle, rectangleStyle } from "./style"
import { fixedPosition } from "./utils"

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
  columns: number
  nickname: string
  integerPartX: number
  integerPartY: number
  decimalPartX: number
  decimalPartY: number
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
    columns,
    nickname,
    integerPartX,
    integerPartY,
    decimalPartX,
    decimalPartY,
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

  const fixedXAndY = fixedPosition(x, y, landingX, columns)

  return (
    <>
      <motion.div
        css={applyDotLintRectangleStyle(
          landingX * unitW,
          landingY * UNIT_HEIGHT,
          true,
        )}
        initial={{ x: fixedXAndY.x * unitW, y: fixedXAndY.y * UNIT_HEIGHT }}
        animate={{ x: fixedXAndY.x * unitW, y: fixedXAndY.y * UNIT_HEIGHT }}
        transition={{ duration: 0.16 }}
        onAnimationComplete={onAnimationComplete}
      >
        <div css={rectangleStyle} />
        <FixedCursor
          userID={userID}
          nickName={nickname}
          integerPartX={integerPartX}
          integerPartY={integerPartY}
          decimalPartX={decimalPartX}
          decimalPartY={decimalPartY}
          status={status}
          unitW={unitW}
        />
      </motion.div>
    </>
  )
}
