import { FC } from "react"
import { RecordEditorItemProps } from "./interface"
import { recordEditorItemContainerStyle } from "./style"
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { Button } from "@illa-design/button"
import { DeleteIcon } from "@illa-design/icon"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const RecordEditorItem: FC<RecordEditorItemProps> = props => {
  const { record, onDelete } = props

  return (
    <div css={recordEditorItemContainerStyle}>
      <CodeEditor mode="TEXT_JS" expectedType={VALIDATION_TYPES.STRING} />
      <CodeEditor mode="TEXT_JS" expectedType={VALIDATION_TYPES.STRING} />
      <Button
        leftIcon={
          <DeleteIcon color={globalColor(`--${illaPrefix}-grayBlue-08`)} />
        }
      />
    </div>
  )
}

RecordEditorItem.displayName = "RecordEditorItem"
