import { CouchDBDeleteRecord } from "@illa-public/public-types"
import { FC } from "react"
import { CouchDBSubPanelProps } from "@/page/App/components/Actions/ActionPanel/CouchDBPanel/interface"
import { DeleteRecordInfo } from "@/page/App/components/Actions/ActionPanel/CouchDBPanel/values"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"

export const DeleteRecordSubPanel: FC<CouchDBSubPanelProps> = (props) => {
  const { onInputValueChange } = props
  const opts = props.opts as CouchDBDeleteRecord

  return (
    <>
      {DeleteRecordInfo.map((info) => {
        const { title, name, expectedType, lineNumbers, style = {} } = info
        const value = opts[name[1] as keyof CouchDBDeleteRecord]
        return (
          <InputEditor
            key={name.join("-")}
            title={title}
            expectedType={expectedType}
            value={value as string}
            onChange={onInputValueChange(name)}
            lineNumbers={!!lineNumbers}
            style={style}
          />
        )
      })}
    </>
  )
}
DeleteRecordSubPanel.displayName = "DeleteRecordSubPanel"
