import { FC, useEffect, useState } from "react"
import {
  mysqlContainerStyle,
  sqlInputStyle,
} from "@/page/App/components/Actions/ActionPanel/MysqlLikePanel/style"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { useDispatch } from "react-redux"
import { CodeEditor } from "@/components/CodeEditor"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { configActions } from "@/redux/config/configSlice"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { MysqlLikePanelProps } from "@/page/App/components/Actions/ActionPanel/interface"
import { Api } from "@/api/base"
import { isObject } from "@illa-design/system"

interface ResourcesData {
  schema: Record<string, unknown>
  resourceName: string
}

const convertResourcesToTables = (data: Record<string, unknown>) => {
  let res: Record<string, string[]> = {}
  if (isObject(data)) {
    for (const dataKey in data) {
      if (isObject(data[dataKey])) {
        const resKeys = []
        const key = data[dataKey]
        if (isObject(key)) {
          for (const keys in key) {
            resKeys.push(keys)
          }
          res[dataKey] = resKeys
        }
      }
    }
  }
  return res
}

export const MysqlLikePanel: FC<MysqlLikePanelProps> = (props) => {
  const dispatch = useDispatch()

  const currentAction = props.action
  const currentContent = props.action.content
  const [sqlTable, setSqlTable] = useState<Record<string, string[]>>()

  useEffect(() => {
    Api.request(
      {
        url: `resources/${currentAction.resourceId}/meta`,
        method: "GET",
      },
      ({ data }: { data: ResourcesData }) => {
        const tables = convertResourcesToTables(data?.schema)
        setSqlTable(tables)
      },
      () => {},
      () => {},
      () => {},
    )
  }, [currentAction.resourceId])

  return (
    <div css={mysqlContainerStyle}>
      <ResourceChoose action={currentAction} />
      <CodeEditor
        placeholder="select * from users;"
        lineNumbers={true}
        height="88px"
        css={sqlInputStyle}
        value={currentContent.query}
        mode="SQL_JS"
        expectedType={VALIDATION_TYPES.STRING}
        tables={sqlTable}
        onChange={(value) => {
          dispatch(
            configActions.updateSelectedAction({
              ...currentAction,
              content: {
                ...currentContent,
                query: value,
              },
            }),
          )
        }}
      />
      <TransformerComponent />
      <ActionEventHandler />
    </div>
  )
}

MysqlLikePanel.displayName = "MysqlPanel"
