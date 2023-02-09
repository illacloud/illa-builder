import { FC, useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Button, Input, useMessage } from "@illa-design/react"
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
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
import { ResourcesData } from "@/redux/resource/resourceState"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const MysqlLikePanel: FC = (props) => {
  const currentAction = useSelector(getCachedAction)!!
  const [sqlTable, setSqlTable] = useState<Record<string, unknown>>()
  const dispatch = useDispatch()

  const appInfo = useSelector(getAppInfo)

  const teamInfo = useSelector(getCurrentTeamInfo)

  const { t } = useTranslation()

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

  const inputRef = useRef<HTMLInputElement>(null)
  const [generateLoading, setGenerateLoading] = useState(false)
  const message = useMessage()

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
            placeholder={t("editor.action.panel.sqlgc.placeholder.text")}
            inputRef={inputRef}
          />
          <Button
            loading={generateLoading}
            size="large"
            bdRadius="0 8px 8px 0"
            pd="9px 24px"
            bg="linear-gradient(90deg, #FF53D9 0%, #AE47FF 100%);"
            leftIcon={<OpenAIIcon />}
            onClick={() => {
              setGenerateLoading(true)
              Api.request<{ payload: string }>(
                {
                  url: `/app/${appInfo.appId}/internalActions/generateSQL`,
                  method: "POST",
                  data: {
                    description: inputRef.current?.value,
                    resourceID: currentAction.resourceId,
                  },
                },
                ({ data }) => {
                  dispatch(
                    configActions.updateCachedAction({
                      ...currentAction,
                      content: {
                        ...mysqlContent,
                        query: data.payload,
                      },
                    }),
                  )
                },
                (error) => {
                  message.error({
                    content: error.data.errorMessage,
                  })
                  setGenerateLoading(false)
                },
                () => {
                  setGenerateLoading(false)
                },
                () => {
                  setGenerateLoading(false)
                },
              )
            }}
          >
            {t("editor.action.panel.sqlgc.button.text")}
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
