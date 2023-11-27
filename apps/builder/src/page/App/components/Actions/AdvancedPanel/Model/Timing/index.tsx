import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { ACTION_RUN_TIME, IAdvancedConfig } from "@illa-public/public-types"
import { FC, useCallback, useContext } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Select, Switch } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import i18n from "@/i18n/config"
import { AdvancedPanelControl } from "@/page/App/components/Actions/AdvancedPanel/Components/Control"
import { AdvancedPanelHeader } from "@/page/App/components/Actions/AdvancedPanel/Components/Header"
import { getCachedActionAdvancedConfig } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getCurrentAppPageNames } from "@/redux/currentApp/components/componentsSelector"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

const RUN_TIME_OPTIONS = [
  {
    label: i18n.t("editor.action.panel.label.option.advanced.on_app_loading"),
    value: "appLoaded",
  },
  {
    label: i18n.t("editor.action.panel.label.option.advanced.on_page_loading"),
    value: "pageLoading",
  },
  {
    label: i18n.t("editor.action.panel.label.option.advanced.none"),
    value: "none",
  },
]

export const TimingSetting: FC = () => {
  const cachedActionAdvancedConfig = useSelector(getCachedActionAdvancedConfig)
  const pageDisplayNames = useSelector(getCurrentAppPageNames)
  const { runtime, pages, delayWhenLoaded, displayLoadingPage } =
    cachedActionAdvancedConfig

  const dispatch = useDispatch()
  const { track } = useContext(MixpanelTrackContext)
  const { t } = useTranslation()

  const handleUpdateAdvancedConfig = useCallback(
    (key: keyof IAdvancedConfig) => {
      return (value: unknown) => {
        const updateSlice: Partial<IAdvancedConfig> = {
          [key]: value,
        }
        if (key === "runtime") {
          switch (value) {
            case ACTION_RUN_TIME.APP_LOADED: {
              updateSlice.pages = []
              updateSlice.displayLoadingPage = false
              break
            }
            case ACTION_RUN_TIME.NONE: {
              updateSlice.pages = []
              updateSlice.delayWhenLoaded = ""
              updateSlice.displayLoadingPage = false
              break
            }
            case ACTION_RUN_TIME.PAGE_LOADING: {
              break
            }
          }
        }

        if (key === "displayLoadingPage" || key === "isPeriodically") {
          track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
            element: "action_inspect_switch",
            parameter2: key,
            parameter3: value,
          })
        }
        dispatch(
          configActions.updateCachedActionAdvancedConfigReducer(updateSlice),
        )
      }
    },
    [dispatch, track],
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

  const handleSelectPopupVisibleChange = useCallback(
    (visible: boolean) => {
      if (!visible) {
        track(ILLA_MIXPANEL_EVENT_TYPE.CHANGE, {
          element: "action_inspect_select",
          parameter2: "pages",
          parameter3: pages.length,
        })
      }
    },
    [pages.length, track],
  )

  const handleOnClickSelect = useCallback(
    (attrName: string) => {
      return () => {
        track(ILLA_MIXPANEL_EVENT_TYPE.BLUR, {
          element: "action_inspect_select",
          parameter2: attrName,
        })
      }
    },
    [track],
  )

  return (
    <div>
      <AdvancedPanelHeader title="TIMING" />
      <AdvancedPanelControl
        title={t("editor.action.panel.label.advanced.page_trigger")}
      >
        <Select
          colorScheme="techPurple"
          options={RUN_TIME_OPTIONS}
          value={runtime}
          onChange={handleUpdateAdvancedConfig("runtime")}
          onClick={handleOnClickSelect("runtime")}
        />
      </AdvancedPanelControl>
      <AdvancedPanelControl
        title={t("editor.action.panel.label.advanced.page_load_delay")}
        disabled={runtime === "none"}
      >
        <CodeEditor
          value={delayWhenLoaded}
          onChange={handleUpdateAdvancedConfig("delayWhenLoaded")}
          expectValueType={VALIDATION_TYPES.NUMBER}
          onFocus={handleCodeMirrorFocus("delayWhenLoaded")}
          onBlur={handleCodeMirrorBlur("delayWhenLoaded")}
        />
      </AdvancedPanelControl>
      <AdvancedPanelControl
        title={t("editor.action.panel.label.advanced.pages")}
        disabled={runtime !== "pageLoading"}
      >
        <Select
          colorScheme="techPurple"
          options={pageDisplayNames}
          value={pages}
          multiple
          onChange={handleUpdateAdvancedConfig("pages")}
          placeholder={t(
            "editor.action.panel.label.placeholder.advanced.select_pages",
          )}
          onVisibleChange={handleSelectPopupVisibleChange}
          onClick={handleOnClickSelect("pages")}
        />
      </AdvancedPanelControl>
      <AdvancedPanelControl
        title={t("editor.action.panel.label.advanced.loading_page")}
        disabled={runtime !== "pageLoading"}
        subtitle={t(
          "editor.action.panel.label.option.advanced.show_a_loading_page_",
        )}
      >
        <Switch
          checked={displayLoadingPage}
          colorScheme="techPurple"
          onChange={handleUpdateAdvancedConfig("displayLoadingPage")}
        />
      </AdvancedPanelControl>
    </div>
  )
}
