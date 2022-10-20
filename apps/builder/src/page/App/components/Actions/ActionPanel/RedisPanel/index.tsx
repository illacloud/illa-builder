import { FC, useEffect, useState } from "react"
import { Api } from "@/api/base"
import { sqlInputStyle } from "@/page/App/components/Actions/ActionPanel/MysqlLikePanel/style"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { CodeEditor } from "@/components/CodeEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { isObject } from "@illa-design/system"
import { ResourcesData } from "@/redux/resource/resourceState"
import { redisContainerStyle } from "@/page/App/components/Actions/ActionPanel/RedisPanel/style"
import {
  RedisAction,
  RedisActionInitial,
} from "@/redux/currentApp/action/redisAction"
import { Controller, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { getCachedAction } from "@/redux/config/configSelector"

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

  const { control } = useForm()

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

  return (
    <div css={redisContainerStyle}>
      <ResourceChoose />
      <Controller
        name="redisQuery"
        control={control}
        defaultValue={currentContent.query}
        render={({ field: { value, onChange }, fieldState, formState }) => (
          <CodeEditor
            placeholder="SET runoobkey redis"
            lineNumbers={true}
            css={sqlInputStyle}
            value={value}
            mode="TEXT_JS"
            expectedType={VALIDATION_TYPES.STRING}
            tables={sqlTable}
            onChange={(value) => {
              onChange(value)
            }}
          />
        )}
      />
      <TransformerComponent />
      <ActionEventHandler />
    </div>
  )
}
