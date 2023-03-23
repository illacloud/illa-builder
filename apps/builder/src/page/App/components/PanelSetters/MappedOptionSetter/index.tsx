import { FC } from "react"
import { renderFieldAndLabel } from "@/page/App/components/InspectPanel/utils/fieldFactory"
import { MappedOptionSetterProps } from "./interface"
import { listStyle, listWrapperStyle, optionListHeaderStyle } from "./style"

export const MappedOptionSetter: FC<MappedOptionSetterProps> = (props) => {
  const { attrName, labelName, childrenSetter, widgetDisplayName } = props

  return (
    <div css={listStyle}>
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
