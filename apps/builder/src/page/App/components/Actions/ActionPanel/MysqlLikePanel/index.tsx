import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import { getCurrentTeamInfo, getPlanUtils } from "@illa-public/user-data"
import { canUseUpgradeFeature } from "@illa-public/user-role-utils"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Button, Input, Select, useMessage } from "@illa-design/react"
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
import { fetchGenerateSQL } from "@/services/action"
import { fetchResourceMeta } from "@/services/resource"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { isILLAAPiError } from "@/utils/typeHelper"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

const MysqlLikePanel: FC = () => {
  const currentAction = useSelector(getCachedAction)!!
  const [sqlTable, setSqlTable] = useState<Record<string, unknown>>()
  const dispatch = useDispatch()
  const appInfo = useSelector(getAppInfo)
  const teamInfo = useSelector(getCurrentTeamInfo)

  const canUseBillingFeature = canUseUpgradeFeature(
    teamInfo?.myRole,
    getPlanUtils(teamInfo),
    teamInfo?.totalTeamLicense?.teamLicensePurchased,
    teamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  )

  const { t } = useTranslation()
  const upgradeModal = useUpgradeModal()

  useEffect(() => {
    if (currentAction.resourceID == undefined) return
    fetchResourceMeta(currentAction.resourceID).then(
      ({ data }: { data: ResourcesData }) => {
        setSqlTable(data?.schema ?? {})
      },
    )
  }, [currentAction.resourceID])

  const mode = useMemo(() => {
    switch (currentAction.actionType) {
      case "hydra":
      case "postgresql":
        return CODE_LANG.PGSQL
      default:
        return CODE_LANG.SQL
    }
  }, [currentAction.actionType])

  const displayName = currentAction.displayName
  const mysqlContent = currentAction.content as MysqlLikeAction
  const value = useMemo(() => {
    return (currentAction.content as MysqlLikeAction)?.query || ""
  }, [currentAction])

  const inputRef = useRef<HTMLInputElement>(null)
  const [generateLoading, setGenerateLoading] = useState(false)
  const [currentSqlAction, setCurrentSqlAction] = useState(1)
  const message = useMessage()

  const handleQueryChange = useCallback(
    (value: string) => {
      dispatch(
        configActions.updateCachedAction({
          ...currentAction,
          content: {
            ...mysqlContent,
            query: value,
          },
        }),
      )
    },
    [currentAction, dispatch, mysqlContent],
  )

  useEffect(() => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
      element: "sql_generation",
      parameter1: currentAction.actionType,
    })
  }, [currentAction.actionType])

  const onBlurOnCodeMirror = useCallback((value: string) => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.BLUR, {
      element: "action_edit_code_mirror",
      parameter2: "content.query",
      parameter3: value.length,
    })
  }, [])
  const handleClickGenerate = useCallback(async () => {
    if (!canUseBillingFeature) {
      upgradeModal({
        modalType: "upgrade",
      })
      return
    }
    setGenerateLoading(true)
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "sql_generation",
      parameter1: currentAction.actionType,
      parameter4: {
        type: currentSqlAction,
        content: inputRef.current?.value,
      },
    })
    const data = {
      description: inputRef.current?.value,
      resourceID: currentAction.resourceID,
      action: currentSqlAction,
    }
    try {
      const response = await fetchGenerateSQL(appInfo.appId, data)
      dispatch(
        configActions.updateCachedAction({
          ...currentAction,
          content: {
            ...mysqlContent,
            query: response.data.payload,
          },
        }),
      )
    } catch (e) {
      if (isILLAAPiError(e)) {
        message.error({
          content: e.data.errorMessage,
        })
      }
    }
    setGenerateLoading(false)
  }, [
    appInfo.appId,
    canUseBillingFeature,
    currentAction,
    currentSqlAction,
    dispatch,
    message,
    mysqlContent,
    upgradeModal,
  ])

  return (
    <div css={mysqlContainerStyle}>
      <ResourceChoose />
      <div css={actionItemContainer}>
        {isCloudVersion ? (
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
              onClick={handleClickGenerate}
            >
              {t("editor.action.panel.sqlgc.button.text")}
            </Button>
          </div>
        ) : null}
        <div css={sqlInputStyle}>
          <CodeEditor
            className={`${displayName}-query`}
            placeholder="select * from users;"
            showLineNumbers
            height="88px"
            value={value}
            lang={mode}
            canShowCompleteInfo
            expectValueType={VALIDATION_TYPES.STRING}
            sqlScheme={sqlTable}
            onChange={handleQueryChange}
            onBlur={onBlurOnCodeMirror}
          />
        </div>
        <TransformerComponent fullWidth />
      </div>
      <ActionEventHandler />
    </div>
  )
}

MysqlLikePanel.displayName = "MysqlPanel"
export default MysqlLikePanel
