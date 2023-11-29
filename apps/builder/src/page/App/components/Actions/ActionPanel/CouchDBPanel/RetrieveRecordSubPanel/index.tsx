import { CouchDBRetrieveRecord } from "@illa-public/public-types"
import { FC } from "react"
import { CouchDBSubPanelProps } from "@/page/App/components/Actions/ActionPanel/CouchDBPanel/interface"
import { RetrieveRecordInfo } from "@/page/App/components/Actions/ActionPanel/CouchDBPanel/values"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"

export const RetrieveRecordSubPanel: FC<CouchDBSubPanelProps> = (props) => {
  const { onInputValueChange } = props
  const opts = props.opts as CouchDBRetrieveRecord

  return (
    <>
      {RetrieveRecordInfo.map((info) => {
        const { title, name, expectedType, lineNumbers, style = {} } = info
        const value = opts[name[1] as keyof CouchDBRetrieveRecord]
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
