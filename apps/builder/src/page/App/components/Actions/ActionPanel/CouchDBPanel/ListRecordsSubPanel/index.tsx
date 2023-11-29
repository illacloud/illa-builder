import { CouchDBListRecords } from "@illa-public/public-types"
import { FC } from "react"
import { CouchDBSubPanelProps } from "@/page/App/components/Actions/ActionPanel/CouchDBPanel/interface"
import { ListRecordsInfo } from "@/page/App/components/Actions/ActionPanel/CouchDBPanel/values"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { SingleComponentType } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent/interface"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"

export const ListRecordsSubPanel: FC<CouchDBSubPanelProps> = (props) => {
  const { onBooleanValueChange, onInputValueChange } = props
  const opts = props.opts as CouchDBListRecords

  return (
    <>
      {ListRecordsInfo.map((info) => {
        const { title, type, name, expectedType, content = "" } = info
        const value = opts[name[1] as keyof CouchDBListRecords]
        if (type === "editor") {
          return (
            <InputEditor
              key={name.join("-")}
              title={title}
              expectedType={expectedType}
              value={value as string}
              onChange={onInputValueChange(name)}
            />
          )
        }
        return (
          <SingleTypeComponent
            key={name.join("-")}
            title={title}
            componentType={type as SingleComponentType}
            onBooleanValueChange={onBooleanValueChange(name)}
            value={value}
            switchContent={content}
          />
        )
      })}
    </>
  )
}
ListRecordsSubPanel.displayName = "ListRecordsSubPanel"
