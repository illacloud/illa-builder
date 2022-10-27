import { FC, useEffect, useMemo, useState } from "react"
import {
  mysqlContainerStyle,
  sqlInputStyle,
} from "@/page/App/components/Actions/ActionPanel/MysqlLikePanel/style"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { CodeEditor } from "@/components/CodeEditor"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { Api } from "@/api/base"
import { isObject } from "@illa-design/system"
import { ResourcesData } from "@/redux/resource/resourceState"
import { Controller, useForm } from "react-hook-form"
import { MysqlLikeAction } from "@/redux/currentApp/action/mysqlLikeAction"
import { useDispatch, useSelector } from "react-redux"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"

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

export const MysqlLikePanel: FC = (props) => {
  const currentAction = useSelector(getCachedAction)!!
  const [sqlTable, setSqlTable] = useState<Record<string, string[]>>()
  const dispatch = useDispatch()

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

  const mode = useMemo(() => {
    switch (currentAction.actionType) {
      case "postgresql":
        return "Postgre_SQL_JS"
      default:
        return "SQL_JS"
    }
  }, [currentAction.actionType])

  const mysqlContent = currentAction.content as MysqlLikeAction

  return (
    <div css={mysqlContainerStyle}>
      <ResourceChoose />
      <CodeEditor
        placeholder="select * from users;"
        lineNumbers={true}
        height="88px"
        css={sqlInputStyle}
        value={mysqlContent.query}
        mode={mode}
        expectedType={VALIDATION_TYPES.STRING}
        tables={sqlTable}
        onChange={(value) => {
          dispatch(
            configActions.updateCachedAction({
              ...currentAction,
              content: {
                ...mysqlContent,
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
