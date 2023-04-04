import { AnimatePresence, motion } from "framer-motion"
import { FC, useCallback, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { ReactComponent as CursorIcon } from "@/assets/public/cursor.svg"
import { cursorActions } from "@/redux/currentApp/cursor/cursorSlice"
import { getColorByString } from "@/utils/colorHelper"
import { CursorProps, NickNameContainerProps } from "./interface"
import { applyCursorContainerStyle, nickNameContainerStyle } from "./style"

export const Cursor: FC<CursorProps> = (props) => {
  const {
    userID,
    nickName,
    integerPartX,
    integerPartY,
    decimalPartX,
    decimalPartY,
    unitW,
    status,
  } = props

  const realX = (integerPartX + decimalPartX) * unitW
  const realY = integerPartY + decimalPartY
  const color = getColorByString(userID)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const onAnimationComplete = useCallback(() => {
    dispatch(cursorActions.removeAnimationEndCursorInfo(userID))
  }, [dispatch, userID])
  const isLeave = status === -1

  useEffect(() => {
    if (isLeave) {
      dispatch(cursorActions.leaveContainerReducer(userID))
    }
  }, [dispatch, isLeave, userID])

  return (
    <AnimatePresence>
      <motion.span
        css={applyCursorContainerStyle(color)}
        initial={{ x: realX - 6, y: realY - 8.5 }}
        animate={{ x: realX - 6, y: realY - 8.5 }}
        transition={{ duration: 0.16 }}
        onAnimationComplete={onAnimationComplete}
      >
        <CursorIcon />
        <NickNameContainer
          nickName={
            nickName?.trim() !== ""
              ? nickName
              : t("widget.collaborative.no_name")
          }
          bgColor={color}
        />
      </motion.span>
    </AnimatePresence>
  )
}

export const NickNameContainer: FC<NickNameContainerProps> = (props) => {
  const { nickName, bgColor } = props
  return <div css={nickNameContainerStyle(bgColor)}>{nickName}</div>
}
