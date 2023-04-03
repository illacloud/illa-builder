import { FC } from "react"
import { useSelector } from "react-redux"
import { getCursorArray } from "../../../../redux/currentApp/cursor/cursorSelector"
import { Cursor } from "./Cursor"
import { MousePreviewProps } from "./interface"

export const MousePreview: FC<MousePreviewProps> = (props) => {
  const { unitW, displayName } = props

  const cursorArray = useSelector(getCursorArray)

  return (
    <>
      {cursorArray.map((item) => (
        <Cursor
          key={item.userID}
          nickName={item.nickname}
          userID={item.userID}
          decimalPartX={item.x}
          decimalPartY={item.y}
          integerPartX={item.w}
          integerPartY={item.h}
          unitW={unitW}
        />
      ))}
    </>
  )
}
