import { FC } from "react"
import { MappedOptionSetterProps } from "./interface"
import { ListStyle, listWrapperStyle, optionListHeaderStyle } from "./style"
import { renderFieldAndLabel } from "@/page/App/components/InspectPanel/utils/fieldFactory"

export const MappedOptionSetter: FC<MappedOptionSetterProps> = (props) => {
  const { attrName, labelName, childrenSetter, widgetDisplayName } = props

  return (
    <div css={ListStyle}>
      <div css={optionListHeaderStyle}>
        <div>{labelName}</div>
      </div>
      <div css={listWrapperStyle}>
        {childrenSetter?.map((child) => {
          return renderFieldAndLabel(
            child,
            widgetDisplayName ?? "",
            true,
            attrName,
          )
        })}
      </div>
    </div>
  )
}

MappedOptionSetter.displayName = "MappedOptionSetter"
