import { CouchDBGetView } from "@illa-public/public-types"
import { FC } from "react"
import { CouchDBSubPanelProps } from "@/page/App/components/Actions/ActionPanel/CouchDBPanel/interface"
import { GetViewRecordsInfo } from "@/page/App/components/Actions/ActionPanel/CouchDBPanel/values"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { SingleComponentType } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent/interface"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"

export const GetViewSubPanel: FC<CouchDBSubPanelProps> = (props) => {
  const { onInputValueChange, onBooleanValueChange } = props
  const opts = props.opts as CouchDBGetView

  return (
    <>
      {GetViewRecordsInfo.map((info) => {
        const {
          title,
          type,
          name,
          expectedType,
          lineNumbers = false,
          style = {},
          content = "",
        } = info
        const value = opts[name[1] as keyof CouchDBGetView]
        if (type === "editor") {
          return (
            <InputEditor
              key={name.join("-")}
              title={title}
              expectedType={expectedType}
              value={value as string}
              onChange={onInputValueChange(name)}
              lineNumbers={lineNumbers}
              style={style}
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
GetViewSubPanel.displayName = "GetViewSubPanel"
