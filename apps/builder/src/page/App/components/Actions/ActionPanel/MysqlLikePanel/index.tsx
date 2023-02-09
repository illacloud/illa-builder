import { FC, useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Button, Input } from "@illa-design/react"
import { Api } from "@/api/base"
import { ReactComponent as OpenAIIcon } from "@/assets/openai.svg"
import { CodeEditor } from "@/components/CodeEditor"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import {
  actionItemContainer,
  mysqlContainerStyle,
  sqlInputStyle,
  sqlTransStyle,
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

  const { t } = useTranslation()

  useEffect(() => {
    Api.request(
      {
        url: `resources/${currentAction.resourceId}/meta`,
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

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div css={mysqlContainerStyle}>
      <ResourceChoose />
      <div css={actionItemContainer}>
        <div css={sqlTransStyle}>
          <Input
            size="large"
            colorScheme="techPurple"
            bdRadius="8px 0 0 8px"
            flexGrow="1"
            flexShrink="1"
            placeholder={"place"}
            inputRef={inputRef}
          />
          <Button
            size="large"
            bdRadius="0 8px 8px 0"
            bg="linear-gradient(90deg, #FF53D9 0%, #AE47FF 100%);"
            leftIcon={<OpenAIIcon />}
          >
            {"test test test"}
          </Button>
        </div>
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
