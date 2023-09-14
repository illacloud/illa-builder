import { FC } from "react"
import RenderFieldAndLabel from "@/page/App/components/InspectPanel/components/FieldAndLabel"
import { MappedOptionSetterProps } from "./interface"
import { listStyle, listWrapperStyle, optionListHeaderStyle } from "./style"

const MappedOptionSetter: FC<MappedOptionSetterProps> = (props) => {
  const { attrName, labelName, childrenSetter, widgetDisplayName } = props

  return (
    <div css={listStyle}>
      <div css={optionListHeaderStyle}>
        <div>{labelName}</div>
      </div>
      <div css={listWrapperStyle}>
        {childrenSetter?.map((child) => {
          const { id } = child

          return (
            <RenderFieldAndLabel
              key={`${id}-${widgetDisplayName}`}
              config={child}
              displayName={widgetDisplayName ?? ""}
              parentAttrName={attrName}
            />
          )
        })}
      </div>
    </div>
  )
}

MappedOptionSetter.displayName = "MappedOptionSetter"
export default MappedOptionSetter
