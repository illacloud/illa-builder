import { FC } from "react"
import { useSelector } from "react-redux"
import { getDragShadowInfoArray } from "@/redux/currentApp/dragShadow/dragShadowSelector"
import { ShadowPreview } from "./Shadow"
import { DragShadowPreviewProps } from "./interface"

export const DragShadowPreview: FC<DragShadowPreviewProps> = (props) => {
  const { unitW, parentDisplayName, columns } = props

  const dragShadowInfoArray = useSelector(getDragShadowInfoArray)

  return (
    <>
      {dragShadowInfoArray.map((item) => {
        const currentItem = item[0]
        return (
          currentItem?.parentDisplayName === parentDisplayName && (
            <ShadowPreview
              key={currentItem.userID}
              x={currentItem.rectX}
              y={currentItem.rectY}
              landingX={currentItem.rectW}
              landingY={currentItem.rectH}
              unitW={unitW}
              displayNames={currentItem.displayNames}
              userID={currentItem.userID}
              status={currentItem.status}
              parentDisplayName={currentItem.parentDisplayName}
              columns={columns}
              integerPartX={currentItem.xInteger}
              integerPartY={currentItem.yInteger}
              decimalPartX={currentItem.xMod}
              decimalPartY={currentItem.yMod}
              nickname={currentItem.nickname}
            />
          )
        )
      })}
    </>
  )
}
