import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Select, TriggerProvider } from "@illa-design/react"
import { getAgentIcon } from "@/page/App/components/Actions/getIcon"
import { getDashboardTeamAIAgentList } from "@/redux/aiAgent/dashboardTeamAIAgentSelector"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  ACTION_RUN_TIME,
  ActionItem,
  ActionTriggerMode,
  IAdvancedConfig,
} from "@/redux/currentApp/action/actionState"
import { AiAgentActionContent } from "@/redux/currentApp/action/aiAgentAction"
import { trackInEditor } from "@/utils/mixpanelHelper"
import {
  itemContainer,
  itemText,
  resourceChooseContainerStyle,
  resourceEndStyle,
  resourceTitleStyle,
} from "./style"

export const AIAgentResourceChoose: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const agentList = useSelector(getDashboardTeamAIAgentList)
  const action = useSelector(getCachedAction)!!
  const selectedAction = useSelector(getSelectedAction)!!

  //maybe empty
  const currentSelectResource = agentList.find(
    (r) => r.aiAgentID === action.resourceID,
  )

  const options = agentList.map((item) => ({
    label: (
      <>
        <div css={itemContainer}>
          {getAgentIcon(item, "14px")}
          <span css={itemText}>{item.name}</span>
        </div>
      </>
    ),
    value: item.aiAgentID,
  }))

  return (
    <TriggerProvider renderInBody zIndex={10}>
      <div css={resourceChooseContainerStyle}>
        <span css={resourceTitleStyle}>{t("resources")}</span>
        <div css={resourceEndStyle}>
          <Select
            w="360px"
            colorScheme="techPurple"
            value={
              currentSelectResource
                ? action.resourceID
                : t("editor.action.resource_choose.deleted")
            }
            onChange={(value) => {
              const resource = agentList.find((r) => r.aiAgentID === value)
              if (resource != undefined) {
                dispatch(
                  configActions.updateCachedAction({
                    ...action,
                    // selected resource is same as action type
                    actionType: "aiagent",
                    resourceID: value as string,
                    content: {
                      ...selectedAction.content,
                      virtualResource: resource,
                    },
                  } as ActionItem<AiAgentActionContent>),
                )
              }
            }}
            options={options}
          />
          <Select
            ml="8px"
            w="360px"
            colorScheme="techPurple"
            value={action.triggerMode}
            onChange={(value) => {
              dispatch(
                configActions.updateCachedAction({
                  ...action,
                  triggerMode: value as ActionTriggerMode,
                }),
              )
              let updateSlice: Partial<IAdvancedConfig> = {}
              if (value === "manually") {
                updateSlice = {
                  runtime: ACTION_RUN_TIME.NONE,
                  pages: [],
                  delayWhenLoaded: "",
                  displayLoadingPage: false,
                }
              }
              if (value === "automate") {
                updateSlice = {
                  runtime: ACTION_RUN_TIME.APP_LOADED,
                  pages: [],
                  delayWhenLoaded: "",
                  displayLoadingPage: false,
                }
              }
              dispatch(
                configActions.updateCachedActionAdvancedConfigReducer(
                  updateSlice,
                ),
              )
            }}
            onClick={() => {
              trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                element: "action_edit_auto_run",
              })
            }}
            options={[
              {
                label: t("editor.action.panel.option.trigger.manually"),
                value: "manually",
              },
              {
                label: t("editor.action.panel.option.trigger.on_change"),
                value: "automate",
              },
            ]}
          />
        </div>
      </div>
    </TriggerProvider>
  )
}
