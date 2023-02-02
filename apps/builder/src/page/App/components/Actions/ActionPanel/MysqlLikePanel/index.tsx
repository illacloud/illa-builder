import { FC, useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { isObject } from "@illa-design/react"
import { Api } from "@/api/base"
import { CodeEditor } from "@/components/CodeEditor"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import {
  actionItemContainer,
  mysqlContainerStyle,
  sqlInputStyle,
} from "@/page/App/components/Actions/ActionPanel/MysqlLikePanel/style"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { MysqlLikeAction } from "@/redux/currentApp/action/mysqlLikeAction"
import { ResourcesData } from "@/redux/resource/resourceState"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const MysqlLikePanel: FC = (props) => {
  const currentAction = useSelector(getCachedAction)!!
  const [sqlTable, setSqlTable] = useState<Record<string, unknown>>()
  const dispatch = useDispatch()

  useEffect(() => {
    Api.request(
      {
        url: `/resources/${currentAction.resourceId}/meta`,
        method: "GET",
      },
      ({ data }: { data: ResourcesData }) => {
        setSqlTable(data?.schema ?? {})
      },
      () => {},
      () => {},
      () => {},
    )
  }, [currentAction.resourceId])

  const mode = useMemo(() => {
    switch (currentAction.actionType) {
      case "postgresql":
        return CODE_LANG.PGSQL
      default:
        return CODE_LANG.SQL
    }
  }, [currentAction.actionType])

  const mysqlContent = currentAction.content as MysqlLikeAction
  const value = useMemo(() => {
    return (currentAction.content as MysqlLikeAction)?.query || ""
  }, [currentAction])

  return (
    <div css={mysqlContainerStyle}>
      <ResourceChoose />
      <div css={actionItemContainer}>
        <div css={sqlInputStyle}>
          <CodeEditor
            placeholder="select * from users;"
            showLineNumbers
            height="88px"
            value={value}
            lang={mode}
            canShowCompleteInfo
            expectValueType={VALIDATION_TYPES.STRING}
            sqlScheme={sqlTable}
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
        </div>
        <TransformerComponent mysqlLike />
      </div>
      <ActionEventHandler />
    </div>
  )
}

MysqlLikePanel.displayName = "MysqlPanel"
