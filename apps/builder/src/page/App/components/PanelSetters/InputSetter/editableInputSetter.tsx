import { EditableInputSetterProps } from "@/page/App/components/PanelSetters/InputSetter/interface"
import {
  editableInputIconStyle,
  editableInputSetterStyle,
} from "@/page/App/components/PanelSetters/InputSetter/style"
import { Input } from "@illa-design/react"
import { FC } from "react"

export const EditableInputSetter: FC<EditableInputSetterProps> = (props) => {
  const { value, handleUpdateDsl, attrName, icon } = props
  return (
    <div css={editableInputSetterStyle}>
      {icon ? <div css={editableInputIconStyle}>{icon}</div> : null}
      <div style={{ width: "130px" }}>
        <Input
          withoutNormalBorder
          borderColor="techPurple"
          value={value}
          onChange={(value) => {
            handleUpdateDsl(attrName, value)
          }}
        />
      </div>
    </div>
  )
}
