import { FC } from "react"
import { RecordEditorProps } from "@/page/App/components/Actions/ActionPanel/RecordEditor/interface"
import { recordEditorContainerStyle, recordEditorStyle } from "./style"

export const RecordEditor: FC<RecordEditorProps> = (props) => {
  const { records, onChange, label } = props

  return (
    <div css={recordEditorContainerStyle}>
      <span>{label}</span>
      <div css={recordEditorStyle}>
        {records.map((record, index) => {
          return <div>{record}</div>
        })}
      </div>
    </div>
  )
}

RecordEditor.displayName = "RecordEditor"
