import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BuilderApi } from "@/api/base"
import { CodeEditor } from "@/components/CodeEditor"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { sqlInputStyle } from "@/page/App/components/Actions/ActionPanel/MysqlLikePanel/style"
import {
  actionItemContainer,
  redisCodeEditorStyle,
  redisContainerStyle,
} from "@/page/App/components/Actions/ActionPanel/RedisPanel/style"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { RedisAction } from "@/redux/currentApp/action/redisAction"
import { ResourcesData } from "@/redux/resource/resourceState"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const RedisPanel: FC = () => {
  const action = useSelector(getCachedAction)!!

  const [sqlTable, setSqlTable] = useState<Record<string, unknown>>()

  useEffect(() => {
    BuilderApi.teamRequest(
      {
        url: `/resources/${action.resourceId}/meta`,
        method: "GET",
      },
      ({ data }: { data: ResourcesData }) => {
        setSqlTable(data?.schema ?? {})
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
      <div css={actionItemContainer}>
        <CodeEditor
          wrapperCss={redisCodeEditorStyle}
          placeholder="SET runoobkey redis"
          showLineNumbers
          value={currentContent.query}
          lang={CODE_LANG.JAVASCRIPT}
          expectValueType={VALIDATION_TYPES.STRING}
          sqlScheme={sqlTable}
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
        <TransformerComponent mysqlLike={true} />
      </div>

      <ActionEventHandler />
    </div>
  )
}
