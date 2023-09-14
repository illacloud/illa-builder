import { FC } from "react"
import RenderFieldAndLabel from "../../components/FieldAndLabel"
import { PanelLabel } from "../../components/Label"
import { StyleContainerSetterProps } from "./interface"
import { containerStyle, headerContainerStyle } from "./style"

const StyleContainerSetter: FC<StyleContainerSetterProps> = (props) => {
  const { childrenSetter, widgetDisplayName, labelName } = props

  return (
    <div css={containerStyle}>
      <div css={headerContainerStyle}>
        <PanelLabel labelName={labelName} />
      </div>
      {childrenSetter?.map((child) => (
        <RenderFieldAndLabel
          key={`${child.id}-${widgetDisplayName}`}
          config={child}
          displayName={widgetDisplayName ?? ""}
          parentAttrName=""
        />
      ))}
    </div>
  )
}

export default StyleContainerSetter
