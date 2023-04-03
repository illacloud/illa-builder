import { AnimatePresence, motion } from "framer-motion"
import { FC } from "react"
import { ReactComponent as CursorIcon } from "@/assets/public/cursor.svg"
import { getColorByString } from "@/utils/colorHelper"
import { CursorProps, NickNameContainerProps } from "./interface"
import { applyCursorContainerStyle, nickNameContainerStyle } from "./style"

export const Cursor: FC<CursorProps> = (props) => {
  const {
    userID,
    nickName = "Andy Mcdonald",
    integerPartX,
    integerPartY,
    decimalPartX,
    decimalPartY,
    unitW,
  } = props

  const realX = (integerPartX + decimalPartX) * unitW
  const realY = integerPartY + decimalPartY
  const color = getColorByString(userID)

  return (
    <AnimatePresence>
      <motion.span
        css={applyCursorContainerStyle(color)}
        animate={{ x: realX - 6, y: realY - 8.5 }}
      >
        <CursorIcon />
        <NickNameContainer nickName={nickName} bgColor={color} />
      </motion.span>
    </AnimatePresence>
  )
}

export const NickNameContainer: FC<NickNameContainerProps> = (props) => {
  const { nickName = "Andy Mcdonald", bgColor = "white" } = props
  return <div css={nickNameContainerStyle(bgColor)}>{nickName}</div>
}
