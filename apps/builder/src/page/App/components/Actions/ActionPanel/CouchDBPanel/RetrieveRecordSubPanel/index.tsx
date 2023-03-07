import { FC } from "react"
import { CouchDBSubPanelProps } from "@/page/App/components/Actions/ActionPanel/CouchDBPanel/interface"
import { RetrieveRecordInfo } from "@/page/App/components/Actions/ActionPanel/CouchDBPanel/values"
import { InputEditor } from "@/page/App/components/InputEditor"
import { RetrieveRecord } from "@/redux/currentApp/action/couchDBAction"

export const RetrieveRecordSubPanel: FC<CouchDBSubPanelProps> = (props) => {
  const { onInputValueChange } = props
  const opts = props.opts as RetrieveRecord

  return (
    <>
      {RetrieveRecordInfo.map((info) => {
        const { title, name, expectedType, lineNumbers, style = {} } = info
        const value = opts[name[1] as keyof RetrieveRecord]
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
RetrieveRecordSubPanel.displayName = "RetrieveRecordSubPanel"
