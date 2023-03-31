import { FC } from "react"
import { useSelector } from "react-redux"
import { renderFieldAndLabel } from "@/page/App/components/InspectPanel/utils/fieldFactory"
import { getGuideInfo } from "@/redux/guide/guideSelector"
import { BodyProps } from "./interface"
import { listWrapperStyle } from "./style"

export const ModalBody: FC<BodyProps> = (props) => {
  const { childrenSetter, widgetDisplayName, attrPath } = props
  const guideInfo = useSelector(getGuideInfo)

  return (
    <div css={listWrapperStyle}>
      {childrenSetter?.map((child) => {
        return renderFieldAndLabel(
          child,
          widgetDisplayName ?? "",
          false,
          attrPath,
          guideInfo,
        )
      })}
    </div>
  )
}

ModalBody.displayName = "ModalBody"
