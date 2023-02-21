import { FC, useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Button, Input, Select, useMessage } from "@illa-design/react"
import { BuilderApi } from "@/api/base"
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
    BuilderApi.teamRequest(
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
  const [currentSqlAction, setCurrentSqlAction] = useState(1)
  const message = useMessage()

  return (
    <div css={mysqlContainerStyle}>
      <ResourceChoose />
      <div css={actionItemContainer}>
        <div css={sqlTransStyle}>
          <Select
            mr="-1px"
            autoAlignPopupWidth={true}
            w="120px"
            flexGrow="0"
            flexShrink="0"
            bdRadius="8px 0 0 8px"
            value={currentSqlAction}
            options={[
              {
                label: "SELECT",
                value: 1,
              },
              {
                label: "INSERT",
                value: 2,
              },
              {
                label: "UPDATE",
                value: 3,
              },
              {
                label: "DELETE",
                value: 4,
              },
            ]}
            onChange={(v) => {
              setCurrentSqlAction(v as number)
            }}
            size="large"
            colorScheme="techPurple"
          />
          <Input
            size="large"
            colorScheme="techPurple"
            bdRadius="0"
            flexGrow="1"
            flexShrink="1"
            placeholder={t("editor.action.panel.sqlgc.placeholder.text")}
            inputRef={inputRef}
          />
          <Button
            minW="168px"
            loading={generateLoading}
            size="large"
            flexGrow="0"
            flexShrink="0"
            bdRadius="0 8px 8px 0"
            pd="9px 24px"
            bg="linear-gradient(90deg, #FF53D9 0%, #AE47FF 100%);"
            leftIcon={<OpenAIIcon />}
            onClick={() => {
              setGenerateLoading(true)
              BuilderApi.teamRequest<{ payload: string }>(
                {
                  url: `/apps/${appInfo.appId}/internalActions/generateSQL`,
                  method: "POST",
                  data: {
                    description: inputRef.current?.value,
                    resourceID: currentAction.resourceId,
                    action: currentSqlAction,
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
                (loading) => {
                  setGenerateLoading(loading)
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
