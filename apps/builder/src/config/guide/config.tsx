import { motion } from "framer-motion"
import { getColor } from "@illa-design/react"
import ButtonHighlightIcon from "@/assets/widgetCover/button-highlight.svg"
import InputHighlightIcon from "@/assets/widgetCover/input-highlight.svg"
import TableHighlightIcon from "@/assets/widgetCover/table-highlight.svg"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { MysqlLikeAction } from "@/redux/currentApp/action/mysqlLikeAction"
import { guideActions } from "@/redux/guide/guideSlice"
import store from "@/store"

export const SELECT_WIDGET_ITEM = {
  INPUT_WIDGET: {
    icon: InputHighlightIcon,
  },
  BUTTON_WIDGET: {
    icon: ButtonHighlightIcon,
  },
  TABLE_WIDGET: {
    icon: TableHighlightIcon,
  },
}
type SelectWidget = keyof typeof SELECT_WIDGET_ITEM
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
    selector: "",
    reduxAction: "components/addComponentReducer",
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
    widgetType: "TABLE_WIDGET",
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
      store.dispatch(guideActions.updateNextStepReducer())
    },
  },
  {
    // 2
    step: 3,
    titleKey: "editor.tutorial.panel.onboarding_app.display_data_title",
    descKey:
      "editor.tutorial.panel.onboarding_app.display_data_description_select",
    selector: ".table-iframe",
    reduxAction: "configActions/updateSelectedComponent",
    doItForMe: () => {
      store.dispatch(configActions.updateSelectedComponent(["table1"]))
    },
  },
  {
    step: 4,
    titleKey: "editor.tutorial.panel.onboarding_app.display_data_title",
    descKey:
      "editor.tutorial.panel.onboarding_app.display_data_description_modify",
    selector: "table-dataSource",
  },
  {
    // 3
    step: 5,
    titleKey: "editor.tutorial.panel.onboarding_app.event_handler_title",
    descKey: "editor.tutorial.panel.onboarding_app.event_handler_description_1",
    selector: ".button-iframe",
    reduxAction: "configActions/updateSelectedComponent",
    doItForMe: () => {
      store.dispatch(configActions.updateSelectedComponent(["button"]))
    },
  },
  {
    step: 6,
    titleKey: "editor.tutorial.panel.onboarding_app.event_handler_title",
    descKey: "editor.tutorial.panel.onboarding_app.event_handler_description_2",
    selector: "button-interaction-event-handler",
  },
  {
    step: 7,
    titleKey: "editor.tutorial.panel.onboarding_app.event_handler_title",
    descKey: "editor.tutorial.panel.onboarding_app.event_handler_description_3",
    // selector: ".button-event-0",
    selector: "button-interaction-event-handler",
  },
  {
    step: 8,
    titleKey: "editor.tutorial.panel.onboarding_app.event_handler_title",
    descKey: "editor.tutorial.panel.onboarding_app.event_handler_description_4",
    selector: "button-interaction-event-handler-action",
  },
  {
    step: 9,
    titleKey: "editor.tutorial.panel.onboarding_app.event_handler_title",
    descKey: "editor.tutorial.panel.onboarding_app.event_handler_description_5",
    selector: "button-interaction-event-handler-query",
  },
  {
    // 4
    step: 10,
    titleKey: "editor.tutorial.panel.onboarding_app.test_it_title",
    descKey: "editor.tutorial.panel.onboarding_app.test_it_description",
    selector: "",
  },
]
