import { Api } from "@/api/base"
import { CodeEditor } from "@/components/CodeEditor"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { sqlInputStyle } from "@/page/App/components/Actions/ActionPanel/MysqlLikePanel/style"
import { redisContainerStyle } from "@/page/App/components/Actions/ActionPanel/RedisPanel/style"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  RedisAction,
  RedisActionInitial,
} from "@/redux/currentApp/action/redisAction"
import { ResourcesData } from "@/redux/resource/resourceState"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { isObject } from "@illa-design/react"
import { FC, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"

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

export const RedisPanel: FC = () => {
  const action = useSelector(getCachedAction)!!

  const [sqlTable, setSqlTable] = useState<Record<string, string[]>>()

  useEffect(() => {
    Api.request(
      {
        url: `resources/${action.resourceId}/meta`,
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
  }, [action.resourceId])

  const currentContent = action.content as RedisAction
  const dispatch = useDispatch()

  return (
    <div css={redisContainerStyle}>
      <ResourceChoose />
      <CodeEditor
        placeholder="SET runoobkey redis"
        lineNumbers={true}
        css={sqlInputStyle}
        value={currentContent.query}
        mode="TEXT_JS"
        expectedType={VALIDATION_TYPES.STRING}
        tables={sqlTable}
        onChange={(value) => {
          dispatch(
            configActions.updateCachedAction({
              ...action,
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
