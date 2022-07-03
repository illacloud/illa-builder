import { FC } from "react"
import { listWrapperStyle } from "./style"
import { BodyProps } from "./interface"
import { renderFieldAndLabel } from "@/page/App/components/InspectPanel/utils/fieldFactory"

export const ModalBody: FC<BodyProps> = (props) => {
  const { childrenSetter, widgetDisplayName, attrPath, index } = props

  return (
    <div css={listWrapperStyle}>
      {childrenSetter?.map((child) => {
        return renderFieldAndLabel(
          child,
          widgetDisplayName ?? "",
          true,
          `${attrPath}.${index}`,
        )
      })}
    </div>
  )
}

ModalBody.displayName = "ModalBody"
