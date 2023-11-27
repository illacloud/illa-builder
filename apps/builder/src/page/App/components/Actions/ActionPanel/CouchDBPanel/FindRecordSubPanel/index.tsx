import { CouchDBFindRecord } from "@illa-public/public-types"
import { FC } from "react"
import { CouchDBSubPanelProps } from "@/page/App/components/Actions/ActionPanel/CouchDBPanel/interface"
import { FindRecordInfo } from "@/page/App/components/Actions/ActionPanel/CouchDBPanel/values"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"

export const FindRecordSubPanel: FC<CouchDBSubPanelProps> = (props) => {
  const { onInputValueChange } = props
  const opts = props.opts as CouchDBFindRecord

  return (
    <>
      {FindRecordInfo.map((info) => {
        const { title, name, expectedType, lineNumbers, style, placeholder } =
          info
        const value = opts[name[1] as keyof CouchDBFindRecord]
        return (
          <InputEditor
            key={name.join("-")}
            title={title}
            expectedType={expectedType}
            value={value as string}
            onChange={onInputValueChange(name)}
            lineNumbers={!!lineNumbers}
            placeholder={placeholder}
            style={style}
          />
        )
      })}
    </>
  )
}
FindRecordSubPanel.displayName = "FindRecordSubPanel"
