import { FC } from "react"
import { useSelector } from "react-redux"
import { getCursorArray } from "@/redux/currentApp/cursor/cursorSelector"
import { Cursor } from "./Cursor"
import { MousePreviewProps } from "./interface"

export const MousePreview: FC<MousePreviewProps> = (props) => {
  const { unitW, displayName } = props

  const cursorArray = useSelector(getCursorArray)

  return (
    <>
      {cursorArray.map((item) => {
        const currentItem = item[0]
        return (
          currentItem?.parentDisplayName === displayName && (
            <Cursor
              key={currentItem.userID}
              nickName={currentItem.nickname}
              userID={currentItem.userID}
              decimalPartX={currentItem.x}
              decimalPartY={currentItem.y}
              integerPartX={currentItem.w}
              integerPartY={currentItem.h}
              status={currentItem.status}
              unitW={unitW}
            />
          )
        )
      })}
    </>
  )
}
