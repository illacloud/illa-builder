import { MysqlLikeAction } from "@illa-public/public-types"
import ButtonHighlightIcon from "@/assets/widgetCover/button-highlight.svg"
import InputHighlightIcon from "@/assets/widgetCover/input-highlight.svg"
import TableHighlightIcon from "@/assets/widgetCover/table-highlight.svg"
import { GUIDE_COMPONENTS } from "@/config/guide/index"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { guideActions } from "@/redux/guide/guideSlice"
import store from "@/store"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"

export const SELECT_WIDGET_ITEM = {
  INPUT_WIDGET: {
    highlightIcon: InputHighlightIcon,
    ...widgetBuilder("INPUT_WIDGET").config,
  },
  BUTTON_WIDGET: {
    highlightIcon: ButtonHighlightIcon,
    ...widgetBuilder("BUTTON_WIDGET").config,
  },
  DATA_GRID_WIDGET: {
    highlightIcon: TableHighlightIcon,
    ...widgetBuilder("DATA_GRID_WIDGET").config,
  },
}

export type SelectWidget = keyof typeof SELECT_WIDGET_ITEM

export const GUIDE_SELECT_WIDGET = Object.keys(
  SELECT_WIDGET_ITEM,
) as SelectWidget[]

export const GUIDE_SQL_QUERY =
  "select * \n" +
  "from users\n" +
  "join orders\n" +
  "on users.id = orders.id\n" +
  "where {{!input1.value}} or lower(users.name) like '%{{input1.value.toLowerCase()}}%'"

export const GUIDE_STEP = [
  {
    // 0
    step: 0.1,
    titleKey: "editor.tutorial.panel.onboarding_app.drag_title",
    descKey: "editor.tutorial.panel.onboarding_app.drag_input",
    widgetType: "INPUT_WIDGET",
    selector: `[data-onboarding-element="INPUT_WIDGET"]`,
    reduxAction: "components/addComponentReducer",
    doItForMe: () => {
      // filter already generate component
      const Components = GUIDE_COMPONENTS.filter((componentNode) => {
        return !DisplayNameGenerator.isAlreadyGenerate(
          componentNode.displayName,
        )
      })
      Components?.forEach((componentNode) => {
        DisplayNameGenerator.addComponentDisplayName(componentNode)
      })
      store.dispatch(componentsActions.addComponentReducer(Components))
      store.dispatch(guideActions.updateCurrentStepReducer(3))
    },
  },
  {
    step: 0.2,
    titleKey: "",
    descKey: "",
    selector: "",
    widgetType: "BUTTON_WIDGET",
    reduxAction: "components/addComponentReducer",
  },
  {
    step: 0.3,
    titleKey: "",
    descKey: "",
    selector: "",
    widgetType: "DATA_GRID_WIDGET",
    reduxAction: "components/addComponentReducer",
  },
  {
    // 1
    step: 1,
    titleKey: "editor.tutorial.panel.onboarding_app.modify_action_title",
    descKey:
      "editor.tutorial.panel.onboarding_app.modify_action_description_modify",
    selector: ".postgresql1-query",
    reduxAction: "config/updateCachedAction",
    doItForMe: () => {
      const currentAction = getCachedAction(store.getState())!!
      const mysqlContent = currentAction.content as MysqlLikeAction
      store.dispatch(
        configActions.updateCachedAction({
          ...currentAction,
          content: {
            ...mysqlContent,
            query: GUIDE_SQL_QUERY,
          },
        }),
      )
    },
  },
  {
    step: 2,
    titleKey: "editor.tutorial.panel.onboarding_app.modify_action_title",
    descKey:
      "editor.tutorial.panel.onboarding_app.modify_action_description_click",
    selector: ".postgresql1-run",
    reduxAction: "guideActions/updateNextStepReducer",
    doItForMe: () => {
      const element = document.querySelector(
        ".postgresql1-run",
      ) as HTMLButtonElement
      element?.click()
    },
  },
  {
    // 2
    step: 3,
    titleKey: "editor.tutorial.panel.onboarding_app.display_data_title",
    descKey:
      "editor.tutorial.panel.onboarding_app.display_data_description_select",
    selector: `[data-displayname="dataGrid1"]`,
    displayName: `dataGrid1`,
    reduxAction: "config/updateSelectedComponent",
    doItForMe: () => {
      store.dispatch(configActions.updateSelectedComponent(["dataGrid1"]))
    },
  },
  {
    step: 4,
    titleKey: "editor.tutorial.panel.onboarding_app.display_data_title",
    descKey:
      "editor.tutorial.panel.onboarding_app.display_data_description_modify",
    selector: "dataGrid-data-source",
    doItForMe: () => {
      store.dispatch(
        componentsActions.updateComponentPropsReducer({
          displayName: "dataGrid1",
          updateSlice: {
            dataSourceJS: "{{postgresql1.data}}",
          },
        }),
      )
    },
  },
  {
    // 3
    step: 5,
    titleKey: "editor.tutorial.panel.onboarding_app.event_handler_title",
    descKey: "editor.tutorial.panel.onboarding_app.event_handler_description_1",
    selector: `[data-displayname="button1"]`,
    displayName: `button1`,
    reduxAction: "config/updateSelectedComponent",
    doItForMe: () => {
      store.dispatch(configActions.updateSelectedComponent(["button1"]))
    },
  },
  {
    step: 6,
    titleKey: "editor.tutorial.panel.onboarding_app.event_handler_title",
    descKey:
      "editor.tutorial.panel.onboarding_app.event_handler_description_all",
    selector: "button-interaction-event-handler",
    doItForMe: () => {
      // whole event
      store.dispatch(
        componentsActions.updateComponentPropsReducer({
          displayName: "button1",
          updateSlice: {
            "events.0": {
              id: "events-3e2c0390-b4f7-4570-9f4b-93c5d59e4c13",
              eventType: "click",
              queryID: "postgresql1",
              actionType: "datasource",
              method: "trigger",
            },
          },
        }),
      )
      // to last step
      store.dispatch(guideActions.updateCurrentStepReducer(11))
    },
  },
  {
    step: 8,
    titleKey: "editor.tutorial.panel.onboarding_app.event_handler_title",
    descKey: "editor.tutorial.panel.onboarding_app.event_handler_description_4",
    selector: "button-interaction-event-handler-action",
    hideTrigger: true,
  },
  {
    step: 9,
    titleKey: "editor.tutorial.panel.onboarding_app.event_handler_title",
    descKey: "editor.tutorial.panel.onboarding_app.event_handler_description_5",
    selector: "button-interaction-event-handler-query",
    hideTrigger: true,
  },
  {
    // 4
    step: 10,
    titleKey: "editor.tutorial.panel.onboarding_app.test_it_title",
    descKey: "editor.tutorial.panel.onboarding_app.test_it_description",
    selector: `[data-onboarding-comp="componentsManager"]`,
    hideExit: true,
    doItForMe: () => {
      store.dispatch(guideActions.updateCurrentStepReducer(12))
    },
  },
  {
    // success
    step: 10,
    titleKey: "editor.tutorial.panel.onboarding_app.congratulations_title",
    descKey: "editor.tutorial.panel.onboarding_app.congratulations_description",
    selector: `[data-onboarding-comp="componentsManager"]`,
    doItForMe: () => {
      store.dispatch(guideActions.updateGuideStatusReducer(false))
    },
  },
]
