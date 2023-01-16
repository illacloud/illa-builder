import { FC } from "react"
import { Input } from "@illa-design/react"
import { EditableInputSetterProps } from "@/page/App/components/PanelSetters/InputSetter/interface"
import {
  editableInputIconStyle,
  editableInputSetterStyle,
} from "@/page/App/components/PanelSetters/InputSetter/style"

export const EditableInputSetter: FC<EditableInputSetterProps> = (props) => {
  const { value, handleUpdateDsl, attrName, icon } = props
  return (
    <div css={editableInputSetterStyle}>
      {icon ? <div css={editableInputIconStyle}>{icon}</div> : null}
      <div style={{ width: "130px" }}>
        <Input
          colorScheme="techPurple"
          value={value}
          onChange={(value) => {
            handleUpdateDsl(attrName, value)
          }}
        />
      </div>
    </div>
  )
}
