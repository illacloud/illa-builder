import { FC } from "react"
import { listWrapperStyle } from "./style"
import { BodyProps } from "./interface"
import { renderFieldAndLabel } from "@/page/App/components/InspectPanel/utils/fieldFactory"

export const ModalBody: FC<BodyProps> = (props) => {
  const { childrenSetter, widgetDisplayName, attrPath } = props

  return (
    <div css={listWrapperStyle}>
      {childrenSetter?.map((child) => {
        return renderFieldAndLabel(
          child,
          widgetDisplayName ?? "",
          false,
          attrPath,
        )
      })}
    </div>
  )
}

ModalBody.displayName = "ModalBody"
