import { StepType } from "@reactour/tour"
import { motion } from "framer-motion"
import { getColor } from "@illa-design/react"
import ButtonHighlightIcon from "@/assets/widgetCover/button-highlight.svg"
import InputHighlightIcon from "@/assets/widgetCover/input-highlight.svg"
import TableHighlightIcon from "@/assets/widgetCover/table-highlight.svg"

export const STEP_0_ITEM = {
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
type SelectWidget = keyof typeof STEP_0_ITEM
export const STEP_0_SELECT_WIDGET = Object.keys(STEP_0_ITEM) as SelectWidget[]

export const STEP: StepType[] = [
  {
    disableActions: true,
    styles: {
      popover: (base: any) => ({
        ...base,
        display: "none",
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
    selector: ".app-editor",
    content: "",
    // disableActions: true,
    action: (elem) => {},
    actionAfter: () => {},
  },
]
