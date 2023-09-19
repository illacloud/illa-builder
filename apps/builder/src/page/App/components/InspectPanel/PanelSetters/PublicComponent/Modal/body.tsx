import { FC } from "react"
import { useSelector } from "react-redux"
import RenderFieldAndLabel from "@/page/App/components/InspectPanel/components/FieldAndLabel"
import { getGuideInfo } from "@/redux/guide/guideSelector"
import { BodyProps } from "./interface"
import { listWrapperStyle } from "./style"

export const ModalBody: FC<BodyProps> = (props) => {
  const { childrenSetter, widgetDisplayName, attrPath } = props
  const guideInfo = useSelector(getGuideInfo)

  return (
    <div css={listWrapperStyle}>
      {childrenSetter?.map((child) => {
        const { id } = child
        return (
          <RenderFieldAndLabel
            key={`${id}-${widgetDisplayName}`}
            config={child}
            displayName={widgetDisplayName ?? ""}
            parentAttrName={attrPath}
            guideInfo={guideInfo}
          />
        )
      })}
    </div>
  )
}

ModalBody.displayName = "ModalBody"
