import { FC } from "react"
import { Input } from "@illa-design/input"
import { editableInputSetterStyle } from "@/page/App/components/PanelSetters/InputSetter/style"
import { ReactComponent as RadioIcon } from "@/assets/radius-icon.svg"
import { ReactComponent as StrokeWidthIcon } from "@/assets/stroke-width-icon.svg"
import { ReactComponent as TextSizeIcon } from "@/assets/text-size-icon.svg"
import { EditableInputSetterProps } from "@/page/App/components/PanelSetters/InputSetter/interface"

const iconNameMapComp = {
  radius: <RadioIcon />,
  strokeWidth: <StrokeWidthIcon />,
  textSize: <TextSizeIcon />,
}

export const EditableInputSetter: FC<EditableInputSetterProps> = props => {
  const { value, handleUpdateDsl, attrName, iconName } = props
  return (
    <div css={editableInputSetterStyle}>
      {iconName ? iconNameMapComp[iconName] : null}
      <div style={{ width: "130px" }}>
        <Input
          withoutNormalBorder
          borderColor="techPurple"
          value={value}
          onChange={value => {
            handleUpdateDsl(attrName, value)
          }}
        />
      </div>
    </div>
  )
}
