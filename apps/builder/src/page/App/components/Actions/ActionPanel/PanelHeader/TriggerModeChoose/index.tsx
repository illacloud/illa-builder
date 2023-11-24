import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import {
  ACTION_RUN_TIME,
  ActionTriggerMode,
  IAdvancedConfig,
} from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Select } from "@illa-design/react"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { trackInEditor } from "@/utils/mixpanelHelper"

const TriggerModeChoose: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const action = useSelector(getCachedAction)!!
  return (
    <Select
      ml="8px"
      colorScheme="techPurple"
      value={action.triggerMode}
      w="360px"
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
          configActions.updateCachedActionAdvancedConfigReducer(updateSlice),
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
  )
}

export default TriggerModeChoose
