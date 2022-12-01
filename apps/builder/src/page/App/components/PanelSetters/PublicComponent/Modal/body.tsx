import { FC } from "react"
import { renderFieldAndLabel } from "@/page/App/components/InspectPanel/utils/fieldFactory"
import { BodyProps } from "./interface"
import { listWrapperStyle } from "./style"

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
