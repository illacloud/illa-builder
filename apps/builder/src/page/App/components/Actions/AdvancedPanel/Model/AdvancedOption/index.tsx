import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { IAdvancedConfig } from "@illa-public/public-types"
import { FC, useCallback, useContext } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Switch } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import { AdvancedPanelControl } from "@/page/App/components/Actions/AdvancedPanel/Components/Control"
import { AdvancedPanelHeader } from "@/page/App/components/Actions/AdvancedPanel/Components/Header"
import { getCachedActionAdvancedConfig } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const AdvancedOptionSetting: FC = () => {
  const cachedActionAdvancedConfig = useSelector(getCachedActionAdvancedConfig)
  const { periodInterval, isPeriodically } = cachedActionAdvancedConfig

  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { track } = useContext(MixpanelTrackContext)

  const handleUpdateAdvancedConfig = useCallback(
    (key: keyof IAdvancedConfig) => {
      return (value: unknown) => {
        const updateSlice = {
          [key]: value,
        }

        switch (key) {
          case "isPeriodically": {
            if (!!value) {
              updateSlice.periodInterval = "{{1800}}"
            } else {
              updateSlice.periodInterval = ""
            }
            break
          }
          default:
            break
        }

        dispatch(
          configActions.updateCachedActionAdvancedConfigReducer(updateSlice),
        )
      }
    },
    [dispatch],
  )

  const handleCodeMirrorFocus = useCallback(
    (attrName: string) => {
      return () => {
        track(ILLA_MIXPANEL_EVENT_TYPE.FOCUS, {
          element: "advanced_code_mirror",
          parameter2: attrName,
        })
      }
    },
    [track],
  )

  const handleCodeMirrorBlur = useCallback(
    (attrName: string) => {
      return (value: string) => {
        track(ILLA_MIXPANEL_EVENT_TYPE.BLUR, {
          element: "advanced_code_mirror",
          parameter2: attrName,
          parameter3: value,
        })
      }
    },
    [track],
  )

  return (
    <div>
      <AdvancedPanelHeader title="Advanced option" />
      <AdvancedPanelControl
        title=""
        subtitle={t("editor.action.panel.label.advanced.run_this_action_peri")}
      >
        <Switch
          colorScheme="techPurple"
          checked={isPeriodically}
          onChange={handleUpdateAdvancedConfig("isPeriodically")}
        />
      </AdvancedPanelControl>
      <AdvancedPanelControl
        title={t("editor.action.panel.label.advanced.interval")}
        disabled={!isPeriodically}
      >
        <CodeEditor
          value={periodInterval}
          onChange={handleUpdateAdvancedConfig("periodInterval")}
          expectValueType={VALIDATION_TYPES.NUMBER}
          onFocus={handleCodeMirrorFocus("periodInterval")}
          onBlur={handleCodeMirrorBlur("periodInterval")}
        />
      </AdvancedPanelControl>
    </div>
  )
}
