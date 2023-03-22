import { StepType } from "@reactour/tour"
import { motion } from "framer-motion"
import { getColor } from "@illa-design/react"
import ButtonHighlightIcon from "@/assets/widgetCover/button-highlight.svg"
import InputHighlightIcon from "@/assets/widgetCover/input-highlight.svg"
import TableHighlightIcon from "@/assets/widgetCover/table-highlight.svg"

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

export const STEP: StepType[] = [
  {
    disableActions: true,
    styles: {
      popover: (base: any) => ({
        ...base,
        // display: "none",
      }),
      maskWrapper: (base: any) => ({
        ...base,
        color: "transparent",
      }),
      clickArea: (base: any) => ({
        ...base,
        display: "none",
      }),
      highlightedArea: (base: any, props: any) => ({
        ...base,
        // display: "block",
        // stroke: "#5ae",
        // fill: "rgb(85, 170, 238,.5);",
        // cursor: "pointer",
        // // Dot with animation
        // strokeWidth: 4,
        // width: 15,
        // height: 15,
        // rx: 100,
        // x: props.x + 10,
        // y: props.y + 10,
      }),
    },
    selector: ".button4-text",
    content: "22222",
    // disableActions: true,
    action: (elem) => {},
    actionAfter: () => {},
  },
]

export const guideConfig = [
  {
    // 0
    step: 0.1,
    titleKey: "editor.tutorial.panel.onboarding_app.drag_title",
    descKey: "editor.tutorial.panel.onboarding_app.drag_input",
    widgetType: "INPUT_WIDGET",
  },
  {
    step: 0.2,
    titleKey: "",
    descKey: "",
    widgetType: "BUTTON_WIDGET",
  },
  {
    step: 0.3,
    titleKey: "",
    descKey: "",
    widgetType: "TABLE_WIDGET",
  },
  {
    // 1
    step: 1,
    titleKey: "editor.tutorial.panel.onboarding_app.modify_action_title",
    descKey:
      "editor.tutorial.panel.onboarding_app.modify_action_description_modify",
    selector: ".mysql-value",
  },
  {
    step: 2,
    titleKey: "editor.tutorial.panel.onboarding_app.modify_action_title",
    descKey:
      "editor.tutorial.panel.onboarding_app.modify_action_description_click",
    selector: ".mysql-save",
  },
  {
    // 2
    step: 3,
    titleKey: "editor.tutorial.panel.onboarding_app.display_data_title",
    descKey:
      "editor.tutorial.panel.onboarding_app.display_data_description_select",
    selector: ".table-iframe",
  },
  {
    step: 4,
    titleKey: "editor.tutorial.panel.onboarding_app.display_data_title",
    descKey:
      "editor.tutorial.panel.onboarding_app.display_data_description_modify",
    selector: ".table-dataSource",
  },
  {
    // 3
    step: 5,
    titleKey: "editor.tutorial.panel.onboarding_app.event_handler_title",
    descKey: "editor.tutorial.panel.onboarding_app.event_handler_description_1",
    selector: ".button-iframe",
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
  },
]
